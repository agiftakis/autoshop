"use server";

import { createHmac, randomInt } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import { computeExpiry } from "@/lib/coupon-time";

// What the form shows after a failed claim: the error message, plus what the
// customer typed, so the form can be refilled instead of wiped.
export type ClaimState = {
    error: string | null;
    values: { fullName: string; address: string; phone: string };
};

const SHOP_PHONE = "(904) 647-9284";
const COUPON_COOKIE = "atr_coupon";
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60; // 30 days
const MAX_CLAIMS_PER_CONNECTION_PER_DAY = 3;
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I/L look-alikes
const CODE_LENGTH = 5;
const MAX_CODE_ATTEMPTS = 5;

const MSG_PHONE_USED = `This phone number has already claimed the new-customer discount. Questions? Call ${SHOP_PHONE}.`;
const MSG_TOO_MANY = `Too many coupons have been claimed from this connection today. Please call the shop at ${SHOP_PHONE}.`;
const MSG_SERVER_PROBLEM = `Something went wrong on our end. Please try again, or call the shop at ${SHOP_PHONE}.`;

// Trims the ends and turns any run of spaces, tabs or line breaks into one space.
function cleanText(value: FormDataEntryValue | null): string {
    return String(value ?? "").replace(/\s+/g, " ").trim();
}

// Keeps only the digits; drops a leading US country code "1" from an 11-digit number.
// Returns the 10-digit number, or null if it is not a valid 10-digit number.
function normalizePhone(raw: string): string | null {
    let digits = raw.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
    return digits.length === 10 ? digits : null;
}

// The visitor's internet address, as reported by Vercel (or the dev server locally).
function getClientIp(headerList: Headers): string {
    const forwardedFor = headerList.get("x-forwarded-for");
    if (forwardedFor) {
        const first = forwardedFor.split(",")[0]?.trim();
        if (first) return first;
    }
    const realIp = headerList.get("x-real-ip")?.trim();
    return realIp || "unknown";
}

function makeCouponCode(): string {
    let code = "ATR-";
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)];
    }
    return code;
}

// True when the database refused a row because a UNIQUE column already holds that value.
function isUniqueViolation(err: unknown, column: "phone_digits" | "code"): boolean {
    const e = err as { code?: string; constraint?: string; detail?: string } | null;
    if (!e || e.code !== "23505") return false;
    return Boolean(e.constraint?.includes(column) || e.detail?.includes(column));
}

/**
 * Runs on the SERVER when a customer submits the discount form.
 * Order: honeypot -> validate -> clean phone -> scramble internet address ->
 * 24-hour limit per connection -> one coupon per phone -> save -> cookie -> coupon page.
 */
export async function claimCoupon(_previous: ClaimState, formData: FormData): Promise<ClaimState> {
    // 1. Honeypot: real visitors never see the "website" field, so only bots fill it in.
    //    Bots are quietly sent to the home page with no explanation.
    if (cleanText(formData.get("website")) !== "") {
        redirect("/");
    }

    // 2. Validate on the server (the browser's own "required" checks can be bypassed).
    const fullName = cleanText(formData.get("fullName"));
    const address = cleanText(formData.get("address"));
    const phoneRaw = cleanText(formData.get("phone"));
    const values = { fullName, address, phone: phoneRaw };

    if (fullName.length < 2 || fullName.length > 80) {
        return { error: "Please enter your full name (2 to 80 characters).", values };
    }
    if (address.length < 8 || address.length > 200) {
        return { error: "Please enter your full address (8 to 200 characters).", values };
    }

    // 3. Phone: digits only, exactly 10 after dropping a leading 1.
    const phoneDigits = normalizePhone(phoneRaw);
    if (!phoneDigits) {
        return { error: "Please enter a 10-digit phone number, for example (904) 555-1234.", values };
    }

    // 4. Scramble the internet address with the secret salt. The raw address is never stored.
    const salt = process.env.COUPON_IP_SALT;
    if (!salt) {
        console.error("[coupon] COUPON_IP_SALT is not set.");
        return { error: MSG_SERVER_PROBLEM, values };
    }
    const ipHash = createHmac("sha256", salt).update(getClientIp(await headers())).digest("hex");

    // The server clock decides the claim time; the customer's device clock is never used.
    const claimedAt = new Date();
    const expiresAt = computeExpiry(claimedAt);
    const dayAgo = new Date(claimedAt.getTime() - 24 * 60 * 60 * 1000);

    let couponId: string | null = null;

    try {
        const sql = getSql();

        // 5. Rolling limit: at most 3 coupons per connection in the last 24 hours.
        const recent = await sql`
      SELECT COUNT(*)::int AS n
      FROM coupons
      WHERE ip_hash = ${ipHash} AND created_at > ${dayAgo.toISOString()}
    `;
        if (Number(recent[0]?.n ?? 0) >= MAX_CLAIMS_PER_CONNECTION_PER_DAY) {
            return { error: MSG_TOO_MANY, values };
        }

        // 6. One coupon per phone number, forever.
        const existing = await sql`SELECT 1 FROM coupons WHERE phone_digits = ${phoneDigits} LIMIT 1`;
        if (existing.length > 0) {
            return { error: MSG_PHONE_USED, values };
        }

        // 7. Save the coupon. If the random code happens to be taken already, try a new one.
        for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS && !couponId; attempt++) {
            try {
                const inserted = await sql`
          INSERT INTO coupons (code, full_name, address, phone_digits, ip_hash, created_at, expires_at)
          VALUES (${makeCouponCode()}, ${fullName}, ${address}, ${phoneDigits}, ${ipHash}, ${claimedAt.toISOString()}, ${expiresAt.toISOString()})
          RETURNING id
        `;
                couponId = String(inserted[0].id);
            } catch (err) {
                // Two claims with the same phone arriving at the same instant: the database's UNIQUE rule catches the second one.
                if (isUniqueViolation(err, "phone_digits")) {
                    return { error: MSG_PHONE_USED, values };
                }
                if (!isUniqueViolation(err, "code")) throw err;
            }
        }
    } catch (err) {
        console.error("[coupon] Database error while claiming a coupon:", err);
        return { error: MSG_SERVER_PROBLEM, values };
    }

    if (!couponId) {
        console.error("[coupon] Could not find an unused coupon code after several attempts.");
        return { error: MSG_SERVER_PROBLEM, values };
    }

    // 8. Remember this browser's coupon so returning to /discount shows the same coupon.
    (await cookies()).set(COUPON_COOKIE, couponId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
    });

    // 9. Send the customer to their coupon page. (redirect must stay outside try/catch.)
    redirect(`/discount/${couponId}`);
}