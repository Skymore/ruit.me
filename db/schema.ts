import {
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  varchar,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core'

export let typeEnum = pgEnum('type', ['blog', 'snippet'])

export let statsTable = pgTable(
  'stats',
  {
    type: typeEnum().notNull(),
    slug: varchar('slug', { length: 255 }).notNull(),
    views: integer('views').notNull().default(0),
    loves: integer('loves').notNull().default(0),
    applauses: integer('applauses').notNull().default(0),
    ideas: integer('ideas').notNull().default(0),
    bullseyes: integer('bullseyes').notNull().default(0),
  },
  ({ type, slug }) => {
    return {
      pk: primaryKey({ columns: [type, slug] }),
    }
  }
)

export const valentineTable = pgTable('valentine', {
  id: varchar('id', { length: 6 }).primaryKey(),
  config: jsonb('config').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
})

export type StatsType = (typeof typeEnum.enumValues)[number]
export type SelectStats = typeof statsTable.$inferSelect
export type SelectValentine = typeof valentineTable.$inferSelect
export type InsertValentine = typeof valentineTable.$inferInsert
