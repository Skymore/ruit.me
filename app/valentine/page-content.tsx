'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Heart, Gift } from 'lucide-react'
import SpaceShooterGame from './space-shooter-game'
import { DEFAULT_VALENTINE_CONFIG, type ValentineConfig } from '~/data/valentine-config'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

interface ValentinePageProps {
  config?: ValentineConfig
}

const TRANSLATIONS = {
  en: {
    title: "Happy Valentine's Day!",
    date: 'February 14, 2025',
    playButton: 'Play Game to Win Your Gift!',
    congratulations: 'Congratulations!',
    keepGoing: 'Keep Going!',
    amazingJob: "Amazing job! You've unlocked your special Valentine's gift! 🎮 💝",
    giftCode: 'Your Gift Code:',
    rewardMessage: (currency: string, amount: number) =>
      `Show me this code to claim your ${currency}${amount} Valentine's gift! 💖`,
    tryAgainMessage:
      "You're still amazing! Want to try the game again for a chance to win the prize? 💝",
    tryAgainButton: '← Try Again',
    gameInstructions: {
      controls: 'Use arrow keys or WASD to control the aircraft (touch screen for mobile devices)',
      objective: 'Collect 10 hearts within 20 seconds to win your reward!',
    },
  },
  zh: {
    title: '情人节快乐！',
    date: '2025年2月14日',
    playButton: '玩游戏赢取礼物！',
    congratulations: '恭喜！',
    keepGoing: '继续加油！',
    amazingJob: '太棒了！你解锁了特别的情人节礼物！🎮 💝',
    giftCode: '你的礼物码：',
    rewardMessage: (currency: string, amount: number) =>
      `使用这个礼物码领取 ${currency}${amount} 的情人节礼物！💖`,
    tryAgainMessage: '你依然很棒！要再试一次赢取奖励吗？💝',
    tryAgainButton: '← 再试一次',
    gameInstructions: {
      controls: '使用方向键或WASD控制飞机（移动设备使用触摸屏）',
      objective: '在20秒内收集10颗心以赢取奖励！',
    },
  },
}

export default function ValentinePageContent({ config: propConfig }: ValentinePageProps) {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [showGiftMessage, setShowGiftMessage] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [config, setConfig] = useState<ValentineConfig>(propConfig || DEFAULT_VALENTINE_CONFIG)

  useEffect(() => {
    // 从 URL 参数中读取配置
    const configParam = searchParams?.get('config')
    if (configParam) {
      try {
        // 解码 Base64 字符串为字节数组
        const binaryString = atob(decodeURIComponent(configParam))
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        // 将字节数组转换为 UTF-8 字符串
        const decodedString = new TextDecoder().decode(bytes)
        // 解析 JSON
        const decodedConfig = JSON.parse(decodedString)
        setConfig(decodedConfig)
      } catch (error) {
        console.error('Failed to parse config from URL:', error)
      }
    }
    setMounted(true)
  }, [searchParams, propConfig])

  // 防止服务端和客户端渲染不匹配
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-red-500"></div>
      </div>
    )
  }

  const {
    recipient,
    sender,
    letter,
    game: { reward },
    lang,
  } = config

  const t = TRANSLATIONS[lang || 'en']

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
    <div
      className={clsx(
        'min-h-screen bg-gradient-to-b from-pink-100 to-red-100 dark:from-pink-800 dark:to-red-800',
        'flex flex-col items-center justify-center p-4'
      )}
    >
      <motion.div
        className="mx-auto max-w-2xl space-y-8 pt-16 text-center"
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
            {t.title}
          </h1>
          <p className="text-xl text-red-500 dark:text-red-100 md:text-2xl">{t.date}</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="prose max-w-none dark:prose-invert">
          <p className="text-lg text-gray-700 dark:text-gray-100 md:text-xl">
            Dear {recipient.name},
          </p>
          {letter.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 dark:text-gray-100 md:text-xl">
              {paragraph}
            </p>
          ))}
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
              <span className="text-lg">{t.playButton}</span>
            </motion.button>
          )}

          {showGame && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <SpaceShooterGame
                onGameComplete={handleGameComplete}
                duration={20}
                targetScore={10}
              />
              <div className="mt-4 text-center text-gray-700 dark:text-gray-100">
                <p>{t.gameInstructions.controls}</p>
                <p>{t.gameInstructions.objective}</p>
              </div>
            </motion.div>
          )}

          {showGiftMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg backdrop-blur-sm dark:bg-gray-700/50"
            >
              <h3 className="mb-4 text-xl font-semibold text-red-500 dark:text-red-200">
                {gameWon ? t.congratulations : t.keepGoing}
              </h3>
              {gameWon ? (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-100">{t.amazingJob}</p>
                  <div className="rounded-lg bg-pink-50 p-4 dark:bg-pink-800/30">
                    <p className="mb-2 text-lg font-semibold text-red-600 dark:text-red-200">
                      {t.giftCode}
                    </p>
                    <p className="font-mono text-2xl tracking-wider text-red-500 dark:text-red-200">
                      {reward.code}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
                      {t.rewardMessage(reward.currency, reward.amount)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mb-4 text-gray-700 dark:text-gray-100">{t.tryAgainMessage}</p>
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
                {t.tryAgainButton}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <p className="mt-2 text-lg text-red-500 dark:text-red-200">{sender.name}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
