import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import type { Content } from '../content'

type Row = Content['path']['rows'][number]

// Linha vertical que se desenha com o scroll; cada marco acende quando o scroll chega nele.
export default function Timeline({ rows, nowLabel, legend }: { rows: Row[]; nowLabel: string; legend: Content['path']['legend'] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <>
    <ul className="mb-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted">
      <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-accent" />{legend.work}</li>
      <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-accent" />{legend.edu}</li>
      <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-accent" />{legend.side}</li>
    </ul>
    <ol ref={ref} className="relative space-y-12 [--x:0.5rem] sm:[--x:9rem]">
      <span aria-hidden className="absolute top-2 bottom-2 left-[var(--x)] w-px -translate-x-1/2 bg-line" />
      <motion.span
        aria-hidden
        className="absolute top-2 bottom-2 left-[var(--x)] w-px origin-top -translate-x-1/2 bg-accent"
        style={{ scaleY: reduce ? 1 : scaleY }}
      />
      {rows.map((r) => (
        <Item key={r.year + r.where + r.what} row={r} nowLabel={nowLabel} />
      ))}
    </ol>
    </>
  )
}

function Item({ row, nowLabel }: { row: Row; nowLabel: string }) {
  const ref = useRef<HTMLLIElement>(null)
  const lit = useReached(ref)
  const isNow = row.kind === 'now'
  const isEdu = row.kind === 'edu'
  const isSide = row.kind === 'side'

  return (
    <li ref={ref} className="relative pl-9 sm:grid sm:grid-cols-[8rem_2rem_1fr] sm:pl-0">
      <span
        aria-hidden
        className={`absolute top-2 left-[var(--x)] z-[1] h-3 w-3 -translate-x-1/2 border-2 transition-all duration-500 ${
          isEdu ? 'rotate-45 rounded-[2px]' : 'rounded-full'
        } ${lit ? (isSide ? 'scale-110 border-accent bg-bg' : 'scale-110 border-accent bg-accent') : 'border-line bg-bg'}`}
      >
        {isNow && lit && <span className="absolute -inset-1 animate-ping rounded-full border border-accent/60" />}
      </span>

      <div className="sm:col-start-1 sm:text-right">
        <p
          className={`font-serif text-2xl leading-none italic transition-colors duration-500 sm:text-4xl ${
            lit ? 'text-fg' : 'text-muted'
          }`}
        >
          {row.year}
        </p>
        <p className="mt-1 text-xs text-muted sm:mt-2">{row.period}</p>
      </div>

      <div className="mt-3 sm:col-start-3 sm:mt-0">
        <h3 className="text-xl font-medium tracking-tight">
          {row.what}
          {isNow && (
            <span className="ml-3 rounded-full bg-accent px-2 py-0.5 align-middle text-xs font-normal text-bg">{nowLabel}</span>
          )}
        </h3>
        <p className="text-muted">{row.where}</p>
        {row.tag && <p className="mt-2 inline-block rounded-full border border-accent/50 px-2 py-0.5 text-xs text-accent">{row.tag}</p>}
        {row.note && <p className="mt-2 max-w-md text-sm text-muted">{row.note}</p>}
      </div>
    </li>
  )
}

// Acende quando o item entra na parte de cima da tela e continua aceso depois de passar por ele.
function useReached(ref: React.RefObject<HTMLElement | null>) {
  const [reached, setReached] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        const above = e.boundingClientRect.top < (e.rootBounds?.top ?? 0)
        if (e.isIntersecting || above) {
          setReached(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return reached
}
