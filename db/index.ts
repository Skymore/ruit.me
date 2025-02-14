import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

config({ path: '.env' })

if (!process.env.DATABASE_URL) {
  throw new Error('process.env.DATABASE_URL is not set!')
}

// Create postgres client with more robust configuration
const client = postgres(process.env.DATABASE_URL, {
  max: 1, // Limit connections
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 10, // Connection timeout after 10 seconds
  max_lifetime: 60 * 30, // Connection lifetime of 30 minutes
})

// Create drizzle client with schema
export const db = drizzle(client, { schema })

export * from './schema'
