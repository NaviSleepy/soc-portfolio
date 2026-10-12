import { createHmac } from "node:crypto";
import { pool } from "@workspace/db";

// Database-backed counters survive restarts and work across serving replicas.
// Fail closed if the store or privacy hashing secret is unavailable.
export async function takeAmbassadorQuota(ip: string): Promise<boolean> {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("Rate-limit hashing unavailable");
  const now = Date.now();
  const tenMinutes = 600_000;
  const hour = 3_600_000;
  const clientWindow = Math.floor(now / tenMinutes);
  const hourlyWindow = Math.floor(now / hour);
  // Salt each window, preventing long-lived cross-window visitor identifiers.
  const digest = createHmac("sha256", secret).update(`${clientWindow}:${ip}`).digest("hex");
  const clientKey = `visitor:${clientWindow}:${digest}`;
  const globalKey = `global:${hourlyWindow}`;
  const result = await pool.query<{ allowed: boolean }>(
    `WITH cleanup AS (
       DELETE FROM ambassador_rate_buckets WHERE expires_at < NOW()
     ), client_counter AS (
       INSERT INTO ambassador_rate_buckets (key, count, expires_at)
       VALUES ($1, 1, $3)
       ON CONFLICT (key) DO UPDATE SET count = ambassador_rate_buckets.count + 1
       RETURNING count
     ), global_counter AS (
       INSERT INTO ambassador_rate_buckets (key, count, expires_at)
       VALUES ($2, 1, $4)
       ON CONFLICT (key) DO UPDATE SET count = ambassador_rate_buckets.count + 1
       RETURNING count
     )
     SELECT ((SELECT count FROM client_counter) <= 12
       AND (SELECT count FROM global_counter) <= 200) AS allowed`,
    [clientKey, globalKey, new Date((clientWindow + 1) * tenMinutes), new Date((hourlyWindow + 1) * hour)],
  );
  return result.rows[0]?.allowed === true;
}
