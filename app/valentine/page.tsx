'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ValentinePageContent from './page-content'
import { Suspense } from 'react'

export default function ValentinePage() {
  return (
    <div className="relative min-h-screen">
      {/* 创建按钮区域 */}
      <div className="flex min-h-[40vh] flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="mb-8 text-4xl font-bold text-red-600 dark:text-red-300 md:text-5xl">
            Create Your Special Valentine's Day Page
          </h1>
          <p className="mb-8 text-lg text-red-500 dark:text-red-200">
            Surprise your loved one with a personalized Valentine's page featuring a fun game and
            special gift! 💝
          </p>
          <Link href="/valentine/create">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xl font-semibold text-red-500 shadow-lg hover:bg-red-50 dark:bg-red-500 dark:text-white dark:hover:bg-red-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Create Your Own Valentine's Page ✨
            </motion.div>
          </Link>
        </div>
      </div>

      {/* 示例页面区域 */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 flex justify-center">
          <div className="rounded-full bg-white px-6 py-2 text-lg font-medium text-red-500 shadow-lg dark:bg-red-900 dark:text-red-100">
            ↓ Preview Example ↓
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ValentinePageContent />
        </Suspense>
      </div>
    </div>
  )
}
