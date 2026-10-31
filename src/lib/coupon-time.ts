// Eastern-time helpers for the new-customer coupon.
// Every timestamp comes from the SERVER clock, never from the customer's device.
// All math goes through the "America/New_York" time zone, so it stays correct
// across daylight saving time changes (March and November).

const SHOP_TIME_ZONE = "America/New_York";
const DAY_MS = 24 * 60 * 60 * 1000;

// Monday closing time used by the Sunday rule: 6:30 PM Eastern.
const MONDAY_CLOSE_HOUR = 18;
const MONDAY_CLOSE_MINUTE = 30;

type EasternParts = {
    year: number;
    month: number; // 1-12
    day: number; // 1-31
    hour: number; // 0-23
    minute: number;
    second: number;
};

// Reads the Eastern-time calendar date and clock time of a moment.
function getEasternParts(date: Date): EasternParts {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: SHOP_TIME_ZONE,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hourCycle: "h23",
    });

    const values: Record<string, number> = {};
    for (const part of formatter.formatToParts(date)) {
        if (part.type !== "literal") values[part.type] = Number(part.value);
    }

    return {
        year: values.year,
        month: values.month,
        day: values.day,
        hour: values.hour === 24 ? 0 : values.hour,
        minute: values.minute,
        second: values.second,
    };
}

// 0 = Sunday, 1 = Monday ... 6 = Saturday, for an Eastern calendar date.
function weekdayOf(year: number, month: number, day: number): number {
    return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

// How far Eastern time is from UTC at a given moment, in milliseconds
// (about -4 hours in summer, -5 hours in winter).
function easternOffsetMs(date: Date): number {
    const p = getEasternParts(date);
    const easternAsIfUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    const wholeSeconds = Math.floor(date.getTime() / 1000) * 1000;
    return easternAsIfUtc - wholeSeconds;
}

// Turns an Eastern wall-clock time (for example Monday 6:30 PM) into an exact moment.
function easternWallTimeToDate(year: number, month: number, day: number, hour: number, minute: number): Date {
    const asIfUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
    let result = asIfUtc - easternOffsetMs(new Date(asIfUtc));
    // Second pass corrects the rare case where the first guess landed on the other side of a clock change.
    result = asIfUtc - easternOffsetMs(new Date(result));
    return new Date(result);
}

// The calendar date one day after the given Eastern date.
function nextCalendarDay(year: number, month: number, day: number): { year: number; month: number; day: number } {
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    return { year: next.getUTCFullYear(), month: next.getUTCMonth() + 1, day: next.getUTCDate() };
}

/**
 * Works out when a coupon expires.
 *
 * Rule: the coupon is good for 24 hours after it was claimed.
 * The shop is closed on Sunday, so if the coupon was claimed on a Sunday, or its
 * 24 hours would run out on a Sunday, the customer gets until at least
 * Monday 6:30 PM Eastern (whichever of the two times is later).
 */
export function computeExpiry(claimedAt: Date): Date {
    const standardExpiry = new Date(claimedAt.getTime() + DAY_MS);

    const claimed = getEasternParts(claimedAt);
    const expiry = getEasternParts(standardExpiry);

    let sunday: { year: number; month: number; day: number } | null = null;
    if (weekdayOf(claimed.year, claimed.month, claimed.day) === 0) {
        sunday = { year: claimed.year, month: claimed.month, day: claimed.day };
    } else if (weekdayOf(expiry.year, expiry.month, expiry.day) === 0) {
        sunday = { year: expiry.year, month: expiry.month, day: expiry.day };
    }

    if (!sunday) return standardExpiry;

    const monday = nextCalendarDay(sunday.year, sunday.month, sunday.day);
    const mondayClose = easternWallTimeToDate(monday.year, monday.month, monday.day, MONDAY_CLOSE_HOUR, MONDAY_CLOSE_MINUTE);

    return mondayClose.getTime() > standardExpiry.getTime() ? mondayClose : standardExpiry;
}

/**
 * Formats a moment for the coupon page, in Eastern time.
 * Example: "Saturday, October 31, 2026, 12:16 AM ET"
 */
export function formatEastern(date: Date): string {
    const datePart = new Intl.DateTimeFormat("en-US", {
        timeZone: SHOP_TIME_ZONE,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(date);

    const timePart = new Intl.DateTimeFormat("en-US", {
        timeZone: SHOP_TIME_ZONE,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
        .format(date)
        .replace(/\u202f/g, " "); // newer systems put a narrow space before AM/PM; use a normal space everywhere

    return `${datePart}, ${timePart} ET`;
}

/** True once the coupon's expiry moment has passed (checked against the server clock). */
export function isExpired(expiresAt: Date, now: Date = new Date()): boolean {
    return now.getTime() >= expiresAt.getTime();
}