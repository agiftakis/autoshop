import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSql } from "@/lib/db";
import DiscountForm from "../_components/discount-form";

// Always run on the server per visit (reads the cookie and the database every time).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "New-Customer Discount | Atlantic Tires, Rims & Auto Repair",
    description: "Claim your 10% new-customer discount at Atlantic Tires, Rims & Auto Repair in Jacksonville.",
    robots: { index: false, follow: false },
};

// Coupon ids are random UUIDs; anything else in the cookie is ignored.
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// If this browser already claimed a coupon, return its id, but only if that coupon still exists.
async function findExistingCouponId(): Promise<string | null> {
    const saved = (await cookies()).get("atr_coupon")?.value;
    if (!saved || !UUID_PATTERN.test(saved)) return null;

    try {
        const sql = getSql();
        const rows = await sql`SELECT id FROM coupons WHERE id = ${saved} LIMIT 1`;
        return rows.length > 0 ? saved : null;
    } catch (err) {
        console.error("[coupon] Could not check the saved coupon:", err);
        return null;
    }
}

export default async function DiscountPage() {
    const existingId = await findExistingCouponId();
    if (existingId) redirect(`/discount/${existingId}`);

    return (
        <section className="bg-gray-50 py-16 px-4">
            <div className="mx-auto max-w-xl">
                <h1 className="text-3xl md:text-4xl font-bold text-charcoal text-center">Get your 10% new-customer discount</h1>
                <p className="mt-4 text-center text-gray-600">Fill in your details below. Your coupon appears on the next page. Take a screenshot of it and show it at the counter.</p>
                <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                    <DiscountForm />
                </div>
                <p className="mt-6 text-center text-sm text-gray-500">10% off parts on repairs under $1,000. Labor is not discounted. One per new customer. Valid until the date and time shown on your coupon.</p>
            </div>
        </section>
    );
}