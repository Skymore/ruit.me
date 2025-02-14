import { eq } from 'drizzle-orm'
import { db } from './index'
import { valentineTable, type InsertValentine, type SelectValentine } from './schema'
import { nanoid } from 'nanoid'
import type { ValentineConfig } from '~/data/valentine-config'

// 创建新的 Valentine 配置
export async function createValentine(config: InsertValentine['config']) {
  const id = nanoid(6)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30) // 30天后过期

  const [valentine] = await db
    .insert(valentineTable)
    .values({
      id,
      config,
      expiresAt,
    })
    .returning()

  return valentine
}

// 获取 Valentine 配置
export async function getValentine(id: string): Promise<SelectValentine | undefined> {
  const valentineRecords = await db
    .select()
    .from(valentineTable)
    .where(eq(valentineTable.id, id))
    .execute()

  return valentineRecords[0]
}

export async function createValentineConfig(config: ValentineConfig) {
  const id = nanoid(6)
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30) // 30 days from now

  await db.insert(valentineTable).values({
    id,
    config,
    expiresAt,
  })

  return id
}

export async function getValentineConfig(id: string) {
  const result = await db.select().from(valentineTable).where(eq(valentineTable.id, id)).limit(1)

  return result[0]
}

// Optional: Clean up expired configs
export async function cleanupExpiredConfigs() {
  await db.delete(valentineTable).where(eq(valentineTable.expiresAt, new Date()))
}
