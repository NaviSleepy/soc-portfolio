import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Counters only. No raw IPs, user-agent strings, questions, answers, or transcripts.
export const ambassadorRateBuckets = pgTable("ambassador_rate_buckets", {
  key: text("key").primaryKey(),
  count: integer("count").notNull().default(0),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});
