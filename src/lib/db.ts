import { neon } from "@neondatabase/serverless";

// The type of the query function that neon() returns (rows come back as plain objects).
type Sql = ReturnType<typeof neon<false, false>>;

// Created once on first use, then reused for every request this server process handles.
let cachedSql: Sql | null = null;

/**
 * Returns the database query function.
 *
 * The database address comes from DATABASE_URL:
 *   - on your machine, from .env.local
 *   - on the live site, from Vercel -> Settings -> Environment Variables
 * It is never written into the code, because the repo is public.
 *
 * Usage in other server files:
 *   const sql = getSql();
 *   const rows = await sql`SELECT id FROM coupons WHERE phone_digits = ${phone}`;
 *
 * Values placed inside ${ } are sent to the database separately from the query text,
 * so nothing a customer types into the form can change what the query does.
 */
export function getSql(): Sql {
    if (cachedSql) return cachedSql;

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        throw new Error(
            "DATABASE_URL is not set. Add it to .env.local (local) and to Vercel -> Settings -> Environment Variables (live site)."
        );
    }

    cachedSql = neon(databaseUrl);
    return cachedSql;
}