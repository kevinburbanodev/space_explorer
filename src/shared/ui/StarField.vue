<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Star {
  x: number
  y: number
  radius: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  depth: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let stars: Star[] = []
let shootingStars: ShootingStar[] = []
let width = 0
let height = 0
let rafId = 0
let pointerTarget = { x: 0, y: 0 }
let pointer = { x: 0, y: 0 }
let nextShootAt = 0
let elapsed = 0

function pickColor() {
  const roll = Math.random()
  if (roll < 0.08) return '#c9c0ff'
  if (roll < 0.16) return '#a9f0e0'
  return '#ffffff'
}

function createStars() {
  const density = Math.min(260, Math.floor((width * height) / 5200))
  stars = Array.from({ length: density }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.4 + 0.3,
    baseAlpha: Math.random() * 0.6 + 0.3,
    twinkleSpeed: Math.random() * 1.5 + 0.4,
    twinklePhase: Math.random() * Math.PI * 2,
    depth: Math.random() * 0.6 + 0.2,
    color: pickColor(),
  }))
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  width = canvas.clientWidth
  height = canvas.clientHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
  createStars()
}

function maybeSpawnShootingStar() {
  if (elapsed < nextShootAt) return
  nextShootAt = elapsed + 2500 + Math.random() * 4500
  const fromLeft = Math.random() > 0.5
  shootingStars.push({
    x: fromLeft ? Math.random() * width * 0.3 : width * 0.7 + Math.random() * width * 0.3,
    y: Math.random() * height * 0.3,
    vx: fromLeft ? 8 + Math.random() * 4 : -(8 + Math.random() * 4),
    vy: 4 + Math.random() * 2,
    life: 0,
    maxLife: 40 + Math.random() * 20,
  })
}

function draw(dt: number) {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  pointer.x += (pointerTarget.x - pointer.x) * 0.05
  pointer.y += (pointerTarget.y - pointer.y) * 0.05
  const scrollOffset = window.scrollY * 0.12

  for (const star of stars) {
    star.twinklePhase += dt * 0.001 * star.twinkleSpeed
    const twinkle = (Math.sin(star.twinklePhase) + 1) / 2
    const alpha = star.baseAlpha * (0.55 + twinkle * 0.45)
    const px = star.x - pointer.x * 34 * star.depth
    const rawY = star.y - pointer.y * 34 * star.depth - scrollOffset * (star.depth * 0.4)
    const py = ((rawY % height) + height) % height
    ctx.globalAlpha = alpha
    ctx.fillStyle = star.color
    ctx.beginPath()
    ctx.arc(px, py, star.radius, 0, Math.PI * 2)
    ctx.fill()
    if (star.radius > 1.2) {
      ctx.globalAlpha = alpha * 0.35
      ctx.beginPath()
      ctx.arc(px, py, star.radius * 2.4, 0, Math.PI * 2)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1

  maybeSpawnShootingStar()
  shootingStars = shootingStars.filter((s) => s.life < s.maxLife)
  for (const s of shootingStars) {
    s.life += 1
    s.x += s.vx
    s.y += s.vy
    const progress = s.life / s.maxLife
    const alpha = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85
    const tailX = s.x - s.vx * 4
    const tailY = s.y - s.vy * 4
    const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
    gradient.addColorStop(0, `rgba(255, 255, 255, ${Math.max(alpha, 0)})`)
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(s.x, s.y)
    ctx.lineTo(tailX, tailY)
    ctx.stroke()
  }
}

function loop(timestamp: number) {
  const last = (loop as unknown as { last?: number }).last ?? timestamp
  const dt = timestamp - last
  ;(loop as unknown as { last?: number }).last = timestamp
  elapsed += dt
  draw(dt)
  rafId = requestAnimationFrame(loop)
}

function onPointerMove(event: PointerEvent) {
  pointerTarget = { x: event.clientX / width - 0.5, y: event.clientY / height - 0.5 }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  ctx = canvas.getContext('2d')
  resize()
  window.addEventListener('resize', resize)
  window.addEventListener('pointermove', onPointerMove)
  rafId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('pointermove', onPointerMove)
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 -z-10 h-full w-full" aria-hidden="true" />
</template>
