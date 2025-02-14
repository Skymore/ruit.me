import { eq, and } from 'drizzle-orm'
import { db } from './index'
import { statsTable, type StatsType } from './schema'

export async function getBlogStats(type: StatsType, slug: string) {
  const stats = await db
    .select()
    .from(statsTable)
    .where(and(eq(statsTable.type, type), eq(statsTable.slug, slug)))
    .execute()

  if (stats.length > 0) {
    return stats[0]
  }

  const [newStats] = await db.insert(statsTable).values({ type, slug }).returning()

  return newStats
}

export async function updateBlogStats(
  type: StatsType,
  slug: string,
  updates: { [key: string]: any }
) {
  const currentStats = await getBlogStats(type, slug)

  // 遍历更新字段，并确保不会更新为比当前值更低的数值
  for (const key in updates) {
    if (typeof updates[key] === 'number' && currentStats[key] !== undefined) {
      updates[key] = Math.max(currentStats[key], updates[key])
    }
  }

  const [updatedStats] = await db
    .update(statsTable)
    .set(updates)
    .where(and(eq(statsTable.type, type), eq(statsTable.slug, slug)))
    .returning()

  return updatedStats
}
