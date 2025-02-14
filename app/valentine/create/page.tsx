'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  DEFAULT_VALENTINE_CONFIG,
  DEFAULT_VALENTINE_CONFIG_ZH,
  type ValentineConfig,
} from '~/data/valentine-config'
import ValentinePageContent from '../page-content'

export default function CreateValentinePage() {
  const [config, setConfig] = useState<ValentineConfig>(DEFAULT_VALENTINE_CONFIG)
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (section: keyof ValentineConfig, field: string, value: any) => {
    if (section === 'lang') {
      const newLang = value as 'en' | 'zh'
      const defaultConfig =
        newLang === 'zh' ? DEFAULT_VALENTINE_CONFIG_ZH : DEFAULT_VALENTINE_CONFIG

      setConfig((prev) => {
        // Check if each field has been modified from its default value
        const isRecipientDefault =
          prev.recipient.name === DEFAULT_VALENTINE_CONFIG.recipient.name ||
          prev.recipient.name === DEFAULT_VALENTINE_CONFIG_ZH.recipient.name
        const isSenderDefault =
          prev.sender.name === DEFAULT_VALENTINE_CONFIG.sender.name ||
          prev.sender.name === DEFAULT_VALENTINE_CONFIG_ZH.sender.name
        const isLetterDefault =
          JSON.stringify(prev.letter.content) ===
            JSON.stringify(DEFAULT_VALENTINE_CONFIG.letter.content) ||
          JSON.stringify(prev.letter.content) ===
            JSON.stringify(DEFAULT_VALENTINE_CONFIG_ZH.letter.content)
        const isGameDefault =
          JSON.stringify(prev.game) === JSON.stringify(DEFAULT_VALENTINE_CONFIG.game) ||
          JSON.stringify(prev.game) === JSON.stringify(DEFAULT_VALENTINE_CONFIG_ZH.game)

        return {
          ...defaultConfig,
          recipient: isRecipientDefault ? defaultConfig.recipient : prev.recipient,
          sender: isSenderDefault ? defaultConfig.sender : prev.sender,
          letter: isLetterDefault ? defaultConfig.letter : prev.letter,
          game: isGameDefault ? defaultConfig.game : prev.game,
          lang: newLang,
        }
      })
      return
    }

    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const generateLink = async () => {
    try {
      const response = await fetch('/api/valentine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error('Failed to generate link')
      }

      const { id } = await response.json()
      const url = `${window.location.origin}/valentine/${id}`

      // Copy to clipboard
      await navigator.clipboard.writeText(url)
      // Open in new tab
      window.open(url, '_blank')
    } catch (error) {
      console.error('Failed to generate link:', error)
      alert('Failed to generate link. Please try again.')
    }
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Your Valentine's Page</h1>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(!showPreview)}
            className="rounded-full bg-pink-500 px-6 py-2 text-white hover:bg-pink-600"
          >
            {showPreview ? 'Edit' : 'Preview'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateLink}
            className="rounded-full bg-red-500 px-6 py-2 text-white hover:bg-red-600"
          >
            Generate Link
          </motion.button>
        </div>
      </div>

      {showPreview ? (
        <ValentinePageContent config={config} />
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <section className="rounded-lg border p-4 dark:border-gray-700">
              <h2 className="mb-4 text-xl font-semibold">Recipient</h2>
              <div>
                <label className="mb-1 block text-sm">Name</label>
                <input
                  type="text"
                  value={config.recipient.name}
                  onChange={(e) => handleChange('recipient', 'name', e.target.value)}
                  className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </section>

            <section className="rounded-lg border p-4 dark:border-gray-700">
              <h2 className="mb-4 text-xl font-semibold">Sender</h2>
              <div>
                <label className="mb-1 block text-sm">Your Name</label>
                <input
                  type="text"
                  value={config.sender.name}
                  onChange={(e) => handleChange('sender', 'name', e.target.value)}
                  className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </section>

            <section className="rounded-lg border p-4 dark:border-gray-700">
              <h2 className="mb-4 text-xl font-semibold">Letter</h2>
              <div>
                <label className="mb-1 block text-sm">Content (one paragraph per line)</label>
                <textarea
                  value={config.letter.content.join('\n')}
                  onChange={(e) =>
                    handleChange(
                      'letter',
                      'content',
                      e.target.value.split('\n').filter((line) => line.trim())
                    )
                  }
                  rows={5}
                  className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-lg border p-4 dark:border-gray-700">
              <h2 className="mb-4 text-xl font-semibold">Gift Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm">Gift Code</label>
                  <input
                    type="text"
                    value={config.game.reward.code}
                    onChange={(e) =>
                      handleChange('game', 'reward', {
                        ...config.game.reward,
                        code: e.target.value,
                      })
                    }
                    className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm">Gift Amount</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={config.game.reward.currency}
                      onChange={(e) =>
                        handleChange('game', 'reward', {
                          ...config.game.reward,
                          currency: e.target.value,
                        })
                      }
                      className="w-16 rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    />
                    <input
                      type="number"
                      value={config.game.reward.amount}
                      onChange={(e) =>
                        handleChange('game', 'reward', {
                          ...config.game.reward,
                          amount: parseInt(e.target.value) || 0,
                        })
                      }
                      className="flex-1 rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border p-4 dark:border-gray-700">
              <h2 className="mb-4 text-xl font-semibold">Language</h2>
              <div>
                <select
                  value={config.lang || 'en'}
                  onChange={(e) => handleChange('lang', '', e.target.value)}
                  className="w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
