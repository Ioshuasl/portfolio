import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'

type Item = { name: string; desc: string; tags: string }

// Pasta em public/projects/<slug>/ com cover.(mp4|webp) quando houver material.
const SLUGS = ['clivra', 'opus', 'gs-sabores', 'weave', 'barbearia']
// Capas largas (diagramas) aparecem inteiras, sem corte.
const CONTAIN = ['barbearia']
// Projetos com várias telas: passam sozinhas dentro do slide.
const GALLERY: Record<string, string[]> = {
  'gs-sabores': ['dashboard.jpg', 'pedidos.jpg', 'cardapio.jpg'],
}
const AUTOPLAY_MS = 7000
const GAP = 16
const SLIDE_RATIO = 0.88 // fatia da largura; o resto deixa o próximo slide aparecer

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ProjectCarousel({ items, soon }: { items: Item[]; soon: string }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [width, setWidth] = useState(0)
  const viewport = useRef<HTMLDivElement>(null)
  const bars = useRef<(HTMLSpanElement | null)[]>([])
  const progress = useRef<ReturnType<typeof animate> | null>(null)
  const n = items.length

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n])

  useEffect(() => {
    const el = viewport.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Barra de progresso do slide ativo; ao terminar, avança.
  useEffect(() => {
    bars.current.forEach((b, i) => {
      if (b && i !== active) b.style.transform = 'scaleX(0)'
    })
    const bar = bars.current[active]
    if (!bar) return
    if (prefersReduced()) {
      bar.style.transform = 'scaleX(1)'
      return
    }
    const a = animate(bar, {
      scaleX: [0, 1],
      duration: AUTOPLAY_MS,
      ease: 'linear',
      onComplete: () => go(active + 1),
    })
    progress.current = a
    return () => {
      a.revert()
      progress.current = null
    }
  }, [active, go])

  useEffect(() => {
    if (paused) progress.current?.pause()
    else progress.current?.play()
  }, [paused, active])

  const slideW = width * SLIDE_RATIO
  const step = slideW + GAP
  const x = -active * step

  const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    const moved = info.offset.x + info.velocity.x * 0.2
    if (moved < -step * 0.2) go(Math.min(active + 1, n - 1))
    else if (moved > step * 0.2) go(Math.max(active - 1, 0))
    else go(active)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(active + 1)
    if (e.key === 'ArrowLeft') go(active - 1)
  }

  const cur = items[active]

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      role="region"
      aria-roledescription="carousel"
    >
      <div ref={viewport} className="overflow-hidden">
        <motion.div
          className="flex cursor-grab touch-pan-y active:cursor-grabbing"
          style={{ gap: GAP }}
          animate={{ x }}
          transition={{ type: 'spring', stiffness: 220, damping: 32, mass: 0.9 }}
          drag="x"
          dragElastic={0.12}
          dragMomentum={false}
          dragConstraints={{ left: x, right: x }}
          onDragEnd={onDragEnd}
        >
          {items.map((it, i) => (
            <motion.div
              key={it.name}
              className="aspect-[16/10] shrink-0 overflow-hidden rounded-xl bg-fg/[0.04] select-none"
              style={{ width: slideW || '88%' }}
              animate={{ opacity: i === active ? 1 : 0.4, scale: i === active ? 1 : 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => i !== active && go(i)}
              aria-hidden={i !== active}
            >
              <Media slug={SLUGS[i]} name={it.name} index={i} soon={soon} active={i === active} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-h-[4.5rem]" aria-live="polite">
          <p className="text-2xl font-medium tracking-tight sm:text-3xl">{cur.name}</p>
          <p className="mt-1 text-muted">
            {cur.desc} <span className="ml-1 text-sm">· {cur.tags}</span>
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ArrowButton dir="prev" onClick={() => go(active - 1)} />
          <ArrowButton dir="next" onClick={() => go(active + 1)} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 sm:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]" style={{ '--n': n } as React.CSSProperties}>
        {items.map((it, i) => (
          <button
            key={it.name}
            onClick={() => go(i)}
            aria-label={it.name}
            aria-current={i === active}
            className={`text-left transition-colors ${i === active ? 'text-fg' : 'text-muted hover:text-fg'}`}
          >
            <span className="relative block h-px w-full bg-line">
              <span
                ref={(el) => {
                  bars.current[i] = el
                }}
                className="absolute inset-y-[-1px] left-0 h-[3px] w-full origin-left bg-accent"
                style={{ transform: 'scaleX(0)' }}
              />
            </span>
            <span className="mt-3 flex items-baseline gap-2 text-sm">
              <span className="tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
              {it.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ArrowButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Anterior' : 'Próximo'}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg transition hover:border-accent hover:text-accent active:scale-95"
    >
      {dir === 'prev' ? '←' : '→'}
    </button>
  )
}

function Media({ slug, name, index, soon, active }: { slug: string; name: string; index: number; soon: string; active: boolean }) {
  const [state, setState] = useState<'video' | 'webp' | 'png' | 'none'>('video')
  const base = `/projects/${slug}/cover`
  const gallery = GALLERY[slug]
  if (gallery) return <Slideshow slug={slug} files={gallery} name={name} active={active} />

  if (state === 'video')
    return (
      <video
        src={`${base}.mp4`}
        className="pointer-events-none h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setState('webp')}
      />
    )
  if (state === 'webp' || state === 'png')
    return (
      <img
        key={state}
        src={`${base}.${state}`}
        alt={name}
        draggable={false}
        className={`pointer-events-none h-full w-full ${CONTAIN.includes(slug) ? 'bg-white object-contain p-3' : 'object-cover'}`}
        loading="lazy"
        onError={() => setState(state === 'webp' ? 'png' : 'none')}
      />
    )
  return (
    <div className="flex h-full w-full flex-col justify-between p-6 sm:p-10">
      <span className="font-serif text-[clamp(4rem,14vw,10rem)] leading-none text-accent italic">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="text-sm text-muted">
        {name} · {soon}
      </span>
    </div>
  )
}

// Passa as telas com fade; só avança enquanto o slide está ativo.
function Slideshow({ slug, files, name, active }: { slug: string; files: string[]; name: string; active: boolean }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!active || prefersReduced()) return
    const t = setInterval(() => setI((n) => (n + 1) % files.length), 2600)
    return () => clearInterval(t)
  }, [active, files.length])

  return (
    <div className="relative h-full w-full bg-white">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={files[i]}
          src={`/projects/${slug}/${files[i]}`}
          alt={`${name} ${i + 1}/${files.length}`}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
      <div className="absolute bottom-4 left-4 flex gap-1.5">
        {files.map((f, n) => (
          <span key={f} className={`h-1.5 rounded-full transition-all ${n === i ? 'w-5 bg-accent' : 'w-1.5 bg-fg/25'}`} />
        ))}
      </div>
    </div>
  )
}
