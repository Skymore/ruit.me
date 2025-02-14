'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SpaceShooterGameProps {
  onGameComplete: (won: boolean) => void
  duration?: number
  targetScore?: number
  customEmojis?: {
    heart?: string
    gift?: string
    aircraft?: string
  }
}

export default function SpaceShooterGame({
  onGameComplete,
  duration = 20,
  targetScore = 10,
  customEmojis,
}: SpaceShooterGameProps) {
  // Game area dimensions (pixels)
  const GAME_WIDTH = typeof window !== 'undefined' ? Math.min(300, window.innerWidth - 32) : 300
  const GAME_HEIGHT = typeof window !== 'undefined' ? Math.min(450, window.innerHeight - 200) : 450

  // Aircraft size - make it proportional to game area
  const SHIP_SIZE = Math.min(40, Math.floor(GAME_WIDTH / 10))
  // Bullet size - make it proportional
  const BULLET_WIDTH = Math.max(3, Math.floor(SHIP_SIZE / 8))
  const BULLET_HEIGHT = Math.max(6, Math.floor(SHIP_SIZE / 4))
  // Heart size - make it proportional
  const HEART_SIZE = Math.min(30, Math.floor(GAME_WIDTH / 13))

  // FPS Control, update every frame
  const FRAMES_PER_UPDATE = 1
  let frameCounter = 0

  // Game area
  const gameAreaRef = useRef<HTMLDivElement>(null)

  // State data, update only when necessary
  const [renderData, setRenderData] = useState({
    shipPos: { x: GAME_WIDTH / 2 - SHIP_SIZE / 2, y: GAME_HEIGHT - SHIP_SIZE - 10 },
    bullets: [] as { id: number; x: number; y: number }[],
    hearts: [] as { id: number; x: number; y: number }[],
    score: 0,
    timeLeft: duration,
    gameState: 'playing' as 'playing' | 'won' | 'lost',
  })

  // Reference data, update every frame
  const shipPosRef = useRef(renderData.shipPos)
  const bulletsRef = useRef(renderData.bullets)
  const heartsRef = useRef(renderData.hearts)
  const scoreRef = useRef(renderData.score)
  const timeLeftRef = useRef(renderData.timeLeft)
  const gameStateRef = useRef(renderData.gameState)

  // Event listener: control movement
  const keysPressed = useRef<{ [key: string]: boolean }>({})

  // ID counter
  const idCounter = useRef(0)
  const getNextId = () => ++idCounter.current

  // Ship speed, bullet speed and heart speed
  const SHIP_SPEED = 5
  const BULLET_SPEED = 6
  const HEART_SPEED = 2

  // Heart spawn timer
  const HEART_INTERVAL = 1000 // milliseconds
  let lastHeartSpawnTime = performance.now()

  // Bullet spawn timer (auto-fire)
  const BULLET_INTERVAL = 300 // milliseconds
  const lastBulletSpawnTimeRef = useRef(performance.now())

  // Timer for updating countdown
  const lastTimerUpdateRef = useRef(performance.now())

  // Main game loop (using requestAnimationFrame)
  useEffect(() => {
    let animationFrameId: number

    const update = (timestamp: number) => {
      // Game logic update
      if (gameStateRef.current !== 'playing') return

      // === 1️⃣ Ship movement ===
      const ship = shipPosRef.current
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['a']) {
        ship.x = Math.max(0, ship.x - SHIP_SPEED)
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['d']) {
        ship.x = Math.min(GAME_WIDTH - SHIP_SIZE, ship.x + SHIP_SPEED)
      }
      if (keysPressed.current['ArrowUp'] || keysPressed.current['w']) {
        ship.y = Math.max(0, ship.y - SHIP_SPEED)
      }
      if (keysPressed.current['ArrowDown'] || keysPressed.current['s']) {
        ship.y = Math.min(GAME_HEIGHT - SHIP_SIZE, ship.y + SHIP_SPEED)
      }

      // === 2️⃣ Bullet firing (auto-fire) ===
      if (timestamp - lastBulletSpawnTimeRef.current >= BULLET_INTERVAL) {
        bulletsRef.current.push({
          id: getNextId(),
          x: ship.x + SHIP_SIZE / 2 - BULLET_WIDTH / 2,
          y: ship.y,
        })
        lastBulletSpawnTimeRef.current = timestamp
      }

      // === 3️⃣ Bullet update ===
      bulletsRef.current = bulletsRef.current
        .map((b) => ({ ...b, y: b.y - BULLET_SPEED }))
        .filter((b) => b.y > -BULLET_HEIGHT)

      // === 4️⃣ Heart generation ===
      if (timestamp - lastHeartSpawnTime >= HEART_INTERVAL) {
        const x = Math.random() * (GAME_WIDTH - HEART_SIZE)
        heartsRef.current.push({ id: getNextId(), x, y: -HEART_SIZE })
        lastHeartSpawnTime = timestamp
      }

      // === 5️⃣ Heart movement ===
      heartsRef.current = heartsRef.current.map((heart) => ({
        ...heart,
        y: heart.y + HEART_SPEED,
      }))

      // === 6️⃣ Collision detection ===
      const remainingHearts: { id: number; x: number; y: number }[] = []
      let hitsThisFrame = 0
      for (const heart of heartsRef.current) {
        let hit = false
        for (const bullet of bulletsRef.current) {
          if (
            bullet.x < heart.x + HEART_SIZE &&
            bullet.x + BULLET_WIDTH > heart.x &&
            bullet.y < heart.y + HEART_SIZE &&
            bullet.y + BULLET_HEIGHT > heart.y
          ) {
            hit = true
            break
          }
        }
        if (hit) hitsThisFrame++
        else remainingHearts.push(heart)
      }
      heartsRef.current = remainingHearts
      scoreRef.current += hitsThisFrame

      // === 7️⃣ Game win/lose detection ===
      if (scoreRef.current >= targetScore) {
        gameStateRef.current = 'won'
        onGameComplete(true)
      }

      // === 8️⃣ Countdown ===
      const currentTime = performance.now()
      if (currentTime - lastTimerUpdateRef.current >= 1000) {
        timeLeftRef.current -= 1
        lastTimerUpdateRef.current = currentTime
        if (timeLeftRef.current === 0 && scoreRef.current < targetScore) {
          gameStateRef.current = 'lost'
          onGameComplete(false)
        }
      }

      // === 9️⃣ Control UI update frequency ===
      frameCounter++
      if (frameCounter % FRAMES_PER_UPDATE === 0) {
        setRenderData({
          shipPos: { ...shipPosRef.current },
          bullets: [...bulletsRef.current],
          hearts: [...heartsRef.current],
          score: scoreRef.current,
          timeLeft: timeLeftRef.current,
          gameState: gameStateRef.current,
        })
      }

      // Request next frame
      animationFrameId = requestAnimationFrame(update)
    }

    animationFrameId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationFrameId)
  }, [onGameComplete])

  // Keyboard event listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key] = false
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Mobile touch control
  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameStateRef.current !== 'playing') return
    const touch = e.touches[0]
    if (!gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const x = touch.clientX - rect.left - SHIP_SIZE / 2
    const y = touch.clientY - rect.top - SHIP_SIZE / 2
    shipPosRef.current.x = Math.max(0, Math.min(GAME_WIDTH - SHIP_SIZE, x))
    shipPosRef.current.y = Math.max(0, Math.min(GAME_HEIGHT - SHIP_SIZE, y))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    // Just handle the touch start without preventing default
  }

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return
      // Force a re-render when window is resized
      setRenderData((prev) => ({ ...prev }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex touch-none flex-col items-center justify-center p-4">
      <div
        ref={gameAreaRef}
        className="relative overflow-hidden rounded-lg bg-gray-800 shadow-lg will-change-transform"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
      >
        {/* 🛩️ Aircraft */}
        <div
          className="absolute"
          style={{
            left: renderData.shipPos.x,
            top: renderData.shipPos.y,
            width: SHIP_SIZE,
            height: SHIP_SIZE,
          }}
        >
          <div className="text-3xl" style={{ transform: 'rotate(-45deg)' }}>
            {customEmojis?.aircraft || '✈️'}
          </div>
        </div>

        {/* 🔫 Bullets */}
        {renderData.bullets.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full bg-yellow-300"
            style={{
              left: b.x,
              top: b.y,
              width: BULLET_WIDTH,
              height: BULLET_HEIGHT,
              boxShadow: '0 0 5px #fff, 0 0 10px #ff0',
            }}
          />
        ))}

        {/* ❤️ Hearts */}
        {renderData.hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-2xl text-pink-300"
            style={{ left: heart.x, top: heart.y }}
          >
            {customEmojis?.heart || '❤️'}
          </div>
        ))}

        {/* 🖥️ HUD */}
        <div className="absolute left-2 top-2 text-sm text-gray-100">
          Time: {renderData.timeLeft}s <br />
          Score: {renderData.score}/{targetScore}
        </div>
      </div>
    </div>
  )
}
