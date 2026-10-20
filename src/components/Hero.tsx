import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import type { Content } from '../content'
import FlowGraph from './FlowGraph'

// Cada linha sobe de dentro de uma máscara; a última ganha o destaque em serifa itálica.
export default function Hero({ t }: { t: Content['hero'] }) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const a = animate(el.querySelectorAll('[data-line]'), {
      translateY: ['110%', '0%'],
      delay: stagger(110),
      duration: 900,
      ease: 'outExpo',
    })
    const b = animate(el.querySelectorAll('[data-fade]'), {
      opacity: [0, 1],
      delay: 500,
      duration: 800,
      ease: 'outQuad',
    })
    return () => {
      a.revert()
      b.revert()
    }
  }, [t])

  return (
    <section ref={root} className="relative pt-40 pb-24 sm:pt-44 sm:pb-32">
      <div className="absolute inset-0"><FlowGraph /></div>
      <h1 className="relative text-[clamp(1.8rem,8vw,5.75rem)] leading-[1] font-medium tracking-[-0.04em]">
        {t.lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.08em]">
            <span
              data-line
              className={`block ${i === t.lines.length - 1 ? 'font-serif italic font-normal tracking-[-0.02em] text-accent' : ''}`}
            >
              {line}
            </span>
          </span>
        ))}
      </h1>
      <p data-fade className="relative mt-10 max-w-md text-lg leading-snug text-muted">
        {t.sub}
      </p>
    </section>
  )
}
