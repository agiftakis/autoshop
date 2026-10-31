// src/app/(public)/discount/[id]/page.tsx
// The coupon page. After a customer claims the new-customer discount, the form sends them here.
// The last part of the web address is the coupon's id. This page looks that id up in the
// coupons table and shows the coupon. If the "valid until" time has passed, the page shows a
// big red EXPIRED banner instead of the "show it at the counter" instruction.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PartyPopper, Camera, CircleAlert } from "lucide-react";
import { getSql } from "@/lib/db";
import { formatEastern, isExpired } from "@/lib/coupon-time";

// Build this page fresh on every visit, so the EXPIRED check always uses the current time.
export const dynamic = "force-dynamic";

// Tell search engines not to list or follow this page: it shows a customer's name, address and phone.
export const metadata: Metadata = {
    title: "Your 10% Coupon | Atlantic Tires, Rims & Auto Repair",
    robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "(904) 647-9284";
const PHONE_TEL = "tel:+19046479284";

// A coupon id is a UUID (universally unique identifier: a long random code such as
// 3f2b8c1e-5d4a-4e7b-9a1c-2b3d4e5f6a7b). When the address holds anything else, the page
// shows "not found" without asking the database.
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type CouponRow = {
    id: string;
    code: string;
    full_name: string;
    address: string;
    phone_digits: string;
    created_at: string | Date;
    expires_at: string | Date;
};

// Turns "9046479284" into "(904) 647-9284". Anything that is not exactly 10 digits is shown as-is.
function formatPhone(digits: string): string {
    if (digits.length !== 10) return digits;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default async function CouponPage({ params }: { params: Promise<{ id: string }> }) {
    // In Next.js 15, params arrives as a Promise (a value that is still on its way), so the page waits for it.
    const { id } = await params;

    if (!UUID_PATTERN.test(id)) {
        notFound();
    }

    let coupon: CouponRow | undefined;
    let lookupFailed = false;

    // Only the database call sits inside try/catch. notFound() works by throwing a special signal,
    // so it must stay outside, or the catch block would swallow it.
    try {
        const sql = getSql();
        const rows = (await sql`
      SELECT id, code, full_name, address, phone_digits, created_at, expires_at
      FROM coupons
      WHERE id = ${id}
    `) as CouponRow[];
        coupon = rows[0];
    } catch (error) {
        console.error("Coupon lookup failed:", error);
        lookupFailed = true;
    }

    if (lookupFailed) {
        return (
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-6 max-w-xl text-center">
                    <CircleAlert className="mx-auto h-12 w-12 text-brand" />
                    <h1 className="mt-4 text-2xl font-bold text-charcoal">We could not load your coupon right now</h1>
                    <p className="mt-3 text-gray-600">
                        Please refresh this page in a minute. If it still does not load, call the shop at{" "}
                        <a href={PHONE_TEL} className="whitespace-nowrap font-semibold text-brand underline">{PHONE_DISPLAY}</a>.
                    </p>
                </div>
            </section>
        );
    }

    if (!coupon) {
        notFound();
    }

    // new Date() works whether the database driver hands back a Date or a text timestamp.
    const claimedAt = new Date(coupon.created_at);
    const expiresAt = new Date(coupon.expires_at);
    const expired = isExpired(expiresAt);

    const details = [
        { label: "Name:", value: coupon.full_name },
        { label: "Address:", value: coupon.address },
        { label: "Phone:", value: formatPhone(coupon.phone_digits) },
        { label: "Claimed:", value: formatEastern(claimedAt) },
        { label: "Valid until:", value: formatEastern(expiresAt) },
    ];

    return (
        <section className="bg-gray-50 py-6 md:py-16">
            <div className="container mx-auto px-4 md:px-6 max-w-xl">
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
                    {expired ? (
                        <div role="alert" className="bg-brand px-6 py-6 text-center text-white">
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest">EXPIRED</h1>
                            <p className="mt-3 text-sm md:text-base text-white/90">This coupon can no longer be used.</p>
                        </div>
                    ) : (
                        <div className="bg-brand px-6 py-5 text-center text-white">
                            <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                                <PartyPopper className="h-8 w-8 text-accent" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold">You got 10% off — good job!</h1>
                            <div className="mx-auto mt-3 flex max-w-sm items-center justify-center gap-2 rounded-lg bg-white/15 px-3 py-2">
                                <Camera className="h-5 w-5 shrink-0 text-accent" />
                                <p className="text-sm md:text-base font-semibold leading-snug">Take a screenshot of this page and show it at the counter.</p>
                            </div>
                        </div>
                    )}

                    <div className="px-5 py-5 md:px-8 md:py-6">
                        <div className="rounded-xl border-2 border-dashed border-gray-300 px-4 py-4 text-center">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Coupon code</p>
                            <p className={`mt-1 font-mono text-4xl md:text-5xl font-bold tracking-widest ${expired ? "text-gray-400 line-through" : "text-charcoal"}`}>{coupon.code}</p>
                            <p className="mt-1 text-sm font-semibold text-brand">10% off parts</p>
                        </div>

                        <dl className="mt-5 grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-2 text-sm md:text-base">
                            {details.map((item) => (
                                <div key={item.label} className="contents">
                                    <dt className="font-semibold text-gray-500">{item.label}</dt>
                                    <dd className={`break-words ${item.label === "Valid until:" ? (expired ? "font-bold text-brand" : "font-bold text-charcoal") : "text-charcoal"}`}>{item.value}</dd>
                                </div>
                            ))}
                        </dl>

                        {expired && (
                            <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-semibold text-brand">
                                Questions? Call the shop at{" "}
                                <a href={PHONE_TEL} className="whitespace-nowrap underline">{PHONE_DISPLAY}</a>.
                            </p>
                        )}

                        <p className="mt-5 text-center text-xs text-gray-500">10% off parts on repairs under $1,000. Labor is not discounted. One per new customer. Valid until the date and time shown.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}