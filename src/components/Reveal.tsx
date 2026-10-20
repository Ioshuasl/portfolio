import { useEffect, useRef, type ReactNode } from 'react'
import { animate } from 'animejs'

// Anima o conteúdo quando entra na tela (Anime.js).
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.style.opacity = '0'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        animate(el, { opacity: [0, 1], translateY: [24, 0], duration: 700, ease: 'outExpo' })
        io.disconnect()
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.style.opacity = ''
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
