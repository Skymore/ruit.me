'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Heart, Gift } from 'lucide-react'
import SpaceShooterGame from './space-shooter-game'

export default function ValentinePage() {
  const [mounted, setMounted] = useState(false)
  const [showGiftMessage, setShowGiftMessage] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const heartbeat = {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  }

  const handleGiftClick = () => {
    setShowGame(true)
  }

  const handleGameComplete = (won: boolean) => {
    setGameWon(won)
    setShowGame(false)
    setShowGiftMessage(true)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-red-100 p-4 dark:from-pink-800 dark:to-red-800">
      <motion.div
        className="mx-auto max-w-2xl space-y-8 text-center"
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div variants={fadeInUp} className="space-y-2">
          <motion.div
            animate={heartbeat}
            className="mb-4 inline-block text-red-500 dark:text-red-200"
          >
            <Heart size={48} />
          </motion.div>
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-200 md:text-6xl">
            Happy Valentine&apos;s Day!
          </h1>
          <p className="text-xl text-red-500 dark:text-red-100 md:text-2xl">February 14, 2025</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="prose max-w-none dark:prose-invert">
          <p className="text-lg text-gray-700 dark:text-gray-100 md:text-xl">Dear Wenlin,</p>
          <p className="text-lg text-gray-700 dark:text-gray-100 md:text-xl">
            Every moment with you is a gift that I cherish deeply. Your smile brightens my days, and
            your love makes my world complete. Thank you for being the most amazing person in my
            life.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-100 md:text-xl">
            On this special day, I want to remind you how much you mean to me and how grateful I am
            to have you in my life.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {['Love', 'Joy', 'Forever'].map((word, index) => (
            <motion.div
              key={word}
              className="rounded-lg bg-white p-6 shadow-lg backdrop-blur-sm dark:bg-gray-700/50"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-red-500 dark:text-red-200">{word}</h3>
              <motion.div animate={heartbeat} className="mt-2 text-red-400 dark:text-red-200">
                <Heart size={24} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          {!showGame && !showGiftMessage && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mx-auto flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 text-white shadow-lg backdrop-blur-sm hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600"
              onClick={handleGiftClick}
            >
              <Gift className="h-6 w-6" />
              <span className="text-lg">Play Game to Win Your Gift!</span>
            </motion.button>
          )}

          {showGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <SpaceShooterGame onGameComplete={handleGameComplete} />
            </motion.div>
          )}

          {showGiftMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg backdrop-blur-sm dark:bg-gray-700/50"
            >
              <h3 className="mb-4 text-xl font-semibold text-red-500 dark:text-red-200">
                {gameWon ? '🎁 Congratulations!' : '💝 Keep Going!'}
              </h3>
              {gameWon ? (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-100">
                    Amazing job! You've unlocked your special Valentine's gift! 🎮 💝
                  </p>
                  <div className="rounded-lg bg-pink-50 p-4 dark:bg-pink-800/30">
                    <p className="mb-2 text-lg font-semibold text-red-600 dark:text-red-200">
                      Your Gift Code:
                    </p>
                    <p className="font-mono text-2xl tracking-wider text-red-500 dark:text-red-200">
                      LOVE-2025
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      Show me this code to claim your $200 Valentine's gift! 💖
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mb-4 text-gray-700 dark:text-gray-100">
                  You're still amazing! Want to try the game again for a chance to win the prize? 💝
                </p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowGiftMessage(false)
                  setShowGame(false)
                }}
                className="mt-4 text-red-500 underline hover:text-red-600 dark:text-red-200 dark:hover:text-red-300"
              >
                ← Try Again
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <p className="text-2xl font-semibold text-red-600 dark:text-red-200">
            With all my love ❤️
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
