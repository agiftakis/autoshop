"use client";

import { useActionState } from "react";
import { LoaderCircle, Tag } from "lucide-react";
import { claimCoupon, type ClaimState } from "../discount/actions";

const initialState: ClaimState = {
    error: null,
    values: { fullName: "", address: "", phone: "" },
};

const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-3 text-charcoal placeholder-gray-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

export default function DiscountForm() {
    // state = what the server sent back last time; formAction = submits to the server; isPending = server is working.
    const [state, formAction, isPending] = useActionState(claimCoupon, initialState);

    return (
        <form action={formAction} className="relative space-y-5">
            {state.error ? (
                <div role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">{state.error}</div>
            ) : null}

            <div className="space-y-1">
                <label htmlFor="fullName" className="block text-sm font-semibold text-charcoal">Full name</label>
                <input id="fullName" name="fullName" type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder="First and last name" defaultValue={state.values.fullName} className={inputClass} />
            </div>

            <div className="space-y-1">
                <label htmlFor="address" className="block text-sm font-semibold text-charcoal">Address</label>
                <input id="address" name="address" type="text" required minLength={8} maxLength={200} autoComplete="street-address" placeholder="Street, city, ZIP" defaultValue={state.values.address} className={inputClass} />
            </div>

            <div className="space-y-1">
                <label htmlFor="phone" className="block text-sm font-semibold text-charcoal">Phone number</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" required maxLength={20} autoComplete="tel" placeholder="(904) 555-1234" defaultValue={state.values.phone} className={inputClass} />
                <p className="text-xs text-gray-500">One coupon per phone number.</p>
            </div>

            {/* Bot trap: hidden from people, screen readers and the Tab key. Only bots fill it in. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label htmlFor="website" className="block">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

            <button type="submit" disabled={isPending} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 text-white font-bold px-6 py-4 text-lg transition-colors duration-300">
                {isPending ? <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> : <Tag className="h-5 w-5" aria-hidden="true" />}
                <span className="leading-tight">{isPending ? "Creating your coupon..." : "Get my 10% coupon"}</span>
            </button>
        </form>
    );
}