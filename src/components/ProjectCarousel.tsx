import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import type { WorkItem, WorkLabels } from '../content'
import ProjectDialog from './ProjectDialog'

// Pasta em public/projects/<slug>/. COVERS diz qual arquivo cada projeto usa (.mp4 vira vídeo); sem entrada, aparece o placeholder.
const SLUGS = ['clivra', 'opus', 'gs-sabores', 'weave', 'barbearia']
const COVERS: Record<string, string> = {
  clivra: 'cover.webp',
  opus: 'cover.webp',
  weave: 'cover.webp',
  barbearia: 'cover.png',
}
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

export default function ProjectCarousel({ items, soon, labels }: { items: WorkItem[]; soon: string; labels: WorkLabels }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(false)
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
    if (paused || open) progress.current?.pause()
    else progress.current?.play()
  }, [paused, open, active])

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
              className="aspect-[16/10] shrink-0 cursor-pointer overflow-hidden rounded-xl bg-fg/[0.04] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              style={{ width: slideW || '88%' }}
              animate={{ opacity: i === active ? 1 : 0.4, scale: i === active ? 1 : 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onTap={() => (i === active ? setOpen(true) : go(i))}
              onKeyDown={(e) => {
                if (i === active && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  setOpen(true)
                }
              }}
              role={i === active ? 'button' : undefined}
              tabIndex={i === active ? 0 : -1}
              aria-label={i === active ? `${labels.open}: ${it.name}` : undefined}
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
      <ProjectDialog
        item={open ? cur : null}
        labels={labels}
        onClose={() => setOpen(false)}
        media={<Media key={cur.name} slug={SLUGS[active]} name={cur.name} index={active} soon={soon} active />}
      />
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
  const [failed, setFailed] = useState(false)
  const gallery = GALLERY[slug]
  if (gallery) return <Slideshow slug={slug} files={gallery} name={name} active={active} />

  const file = COVERS[slug]
  const src = file && !failed ? `/projects/${slug}/${file}` : null
  if (src && file.endsWith('.mp4'))
    return (
      <video
        src={src}
        className="pointer-events-none h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />
    )
  if (src)
    return (
      <img
        src={src}
        alt={name}
        draggable={false}
        className={`pointer-events-none h-full w-full ${CONTAIN.includes(slug) ? 'bg-white object-contain p-3' : 'object-cover'}`}
        loading="lazy"
        onError={() => setFailed(true)}
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
