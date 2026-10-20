import { useEffect, useMemo, useRef, useState } from 'react'
import { animate } from 'animejs'

// Fundo generativo: serviços ligados por rotas ortogonais, com pacotes de dados trafegando entre eles.
// Os rótulos são as tecnologias e projetos reais do portfólio. Pacotes e pulsos usam Anime.js.

type Pt = [number, number]
type Node = { x: number; y: number; label?: string; kind: 'service' | 'db' | 'queue' }
type Edge = { a: number; b: number; pts: Pt[]; seg: number[]; total: number }

const LABELS: { label: string; kind: Node['kind'] }[] = [
  { label: 'gateway', kind: 'service' },
  { label: 'auth', kind: 'service' },
  { label: 'api', kind: 'service' },
  { label: 'pedidos', kind: 'service' },
  { label: 'n8n', kind: 'service' },
  { label: 'whatsapp', kind: 'service' },
  { label: 'weave', kind: 'service' },
  { label: 'clivra', kind: 'service' },
  { label: 'pdf', kind: 'service' },
  { label: 'worker', kind: 'service' },
  { label: 'redis', kind: 'db' },
  { label: 'postgres', kind: 'db' },
  { label: 'mysql', kind: 'db' },
  { label: 'fila', kind: 'queue' },
]

const MAX_PACKETS = 7
const SVG = 'http://www.w3.org/2000/svg'

function rng(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Rect = { x0: number; y0: number; x1: number; y1: number }

const hits = (r: Rect, x0: number, y0: number, x1: number, y1: number) =>
  Math.min(x0, x1) < r.x1 && Math.max(x0, x1) > r.x0 && Math.min(y0, y1) < r.y1 && Math.max(y0, y1) > r.y0

function buildGraph(w: number, h: number, avoid: Rect[]) {
  const rand = rng(20240817)
  const count = Math.max(12, Math.min(34, Math.round((w * h) / 36000)))
  const minDist = 118
  let nodes: Node[] = []
  for (let tries = 0; tries < 4000 && nodes.length < count; tries++) {
    const x = 30 + rand() * (w - 60)
    const y = 30 + rand() * (h - 60)
    // nó + rótulo não podem cair em cima do texto do hero
    if (avoid.some((r) => hits(r, x - 10, y - 10, x + 90, y + 10))) continue
    if (nodes.every((n) => Math.hypot(n.x - x, n.y - y) >= minDist)) nodes.push({ x, y, kind: 'service' })
  }
  // rótulos em nós aleatórios
  const order = nodes.map((_, i) => i).sort(() => rand() - 0.5)
  LABELS.forEach((l, k) => {
    const n = nodes[order[k]]
    if (n) {
      n.label = l.label
      n.kind = l.kind
    }
  })

  const seen = new Set<string>()
  const edges: Edge[] = []
  nodes.forEach((n, i) => {
    const near = nodes
      .map((m, j) => ({ j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2 + (rand() > 0.6 ? 1 : 0))
    near.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) return
      seen.add(key)
      const m = nodes[j]
      const route = (horizontalFirst: boolean): Pt[] => {
        const mid = horizontalFirst ? (n.x + m.x) / 2 : (n.y + m.y) / 2
        return horizontalFirst
          ? [[n.x, n.y], [mid, n.y], [mid, m.y], [m.x, m.y]]
          : [[n.x, n.y], [n.x, mid], [m.x, mid], [m.x, m.y]]
      }
      const crosses = (p: Pt[]) =>
        p.slice(1).some((q, s) => avoid.some((r) => hits(r, p[s][0], p[s][1], q[0], q[1])))
      const first = rand() > 0.5
      let pts = route(first)
      if (crosses(pts)) pts = route(!first)
      if (crosses(pts)) return // sem rota livre: a ligação é descartada
      const seg: number[] = []
      let total = 0
      for (let s = 1; s < pts.length; s++) {
        const l = Math.hypot(pts[s][0] - pts[s - 1][0], pts[s][1] - pts[s - 1][1])
        seg.push(l)
        total += l
      }
      edges.push({ a: i, b: j, pts, seg, total })
    })
  })
  // remove nós sem nenhuma ligação e reindexa as arestas
  const used = new Set<number>()
  edges.forEach((e) => {
    used.add(e.a)
    used.add(e.b)
  })
  const remap = new Map<number, number>()
  const kept: Node[] = []
  nodes.forEach((n, i) => {
    if (used.has(i)) {
      remap.set(i, kept.length)
      kept.push(n)
    }
  })
  nodes = kept
  edges.forEach((e) => {
    e.a = remap.get(e.a)!
    e.b = remap.get(e.b)!
  })
  const adj: number[][] = nodes.map(() => [])
  edges.forEach((e, k) => {
    adj[e.a].push(k)
    adj[e.b].push(k)
  })
  return { nodes, edges, adj }
}

function pointAt(e: Edge, t: number, reverse: boolean): Pt {
  let d = (reverse ? 1 - t : t) * e.total
  for (let s = 0; s < e.seg.length; s++) {
    if (d <= e.seg[s] || s === e.seg.length - 1) {
      const k = e.seg[s] ? Math.min(1, d / e.seg[s]) : 0
      const [x1, y1] = e.pts[s]
      const [x2, y2] = e.pts[s + 1]
      return [x1 + (x2 - x1) * k, y1 + (y2 - y1) * k]
    }
    d -= e.seg[s]
  }
  return e.pts[e.pts.length - 1]
}

export default function FlowGraph() {
  const box = useRef<HTMLDivElement>(null)
  const svgPackets = useRef<SVGGElement>(null)
  const nodeEls = useRef<(SVGGElement | null)[]>([])
  const edgeEls = useRef<(SVGPathElement | null)[]>([])
  const [size, setSize] = useState<{ w: number; h: number; avoid: Rect[] }>({ w: 0, h: 0, avoid: [] })
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      // Zonas de texto do hero (título por linha e parágrafo) onde o grafo não desenha nada.
      // Horizontal vem do texto real; vertical vem do bloco estável, pois as linhas sobem em animação.
      const avoid: Rect[] = []
      el.closest('section')
        ?.querySelectorAll<HTMLElement>('[data-line], p')
        .forEach((t) => {
          const box = (t.closest('span.overflow-hidden') ?? t).getBoundingClientRect()
          const range = document.createRange()
          range.selectNodeContents(t)
          const text = range.getBoundingClientRect()
          if (!text.width) return
          avoid.push({
            x0: text.left - r.left - 28,
            x1: text.right - r.left + 28,
            y0: box.top - r.top - 14,
            y1: box.bottom - r.top + 14,
          })
        })
      setSize({ w: Math.round(r.width), h: Math.round(r.height), avoid })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const late = setTimeout(measure, 1400) // depois da animação de entrada, com as fontes carregadas
    return () => {
      ro.disconnect()
      clearTimeout(late)
    }
  }, [])

  const avoidKey = size.avoid.map((a) => `${Math.round(a.x0)},${Math.round(a.y0)},${Math.round(a.x1)},${Math.round(a.y1)}`).join('|')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const graph = useMemo(() => (size.w > 0 && size.h > 0 ? buildGraph(size.w, size.h, size.avoid) : null), [size.w, size.h, avoidKey])

  useEffect(() => {
    const host = box.current
    const layer = svgPackets.current
    if (!host || !layer || !graph || reduced) return
    const { nodes, edges, adj } = graph
    if (!edges.length) return

    let running = true
    let live = 0
    const anims: { revert: () => unknown }[] = []

    const pulse = (i: number) => {
      const ring = nodeEls.current[i]?.querySelector('[data-ring]')
      if (ring) animate(ring, { scale: [1, 2.8], opacity: [0.7, 0], duration: 900, ease: 'outQuad' })
    }

    const launch = (from: number, edgeIdx: number) => {
      const e = edges[edgeIdx]
      const reverse = e.b === from
      const dest = reverse ? e.a : e.b
      const dot = document.createElementNS(SVG, 'circle')
      dot.setAttribute('r', '3')
      dot.setAttribute('fill', 'var(--accent)')
      dot.style.filter = 'drop-shadow(0 0 4px var(--accent))'
      layer.appendChild(dot)
      const state = { t: 0 }
      live++
      const a = animate(state, {
        t: 1,
        duration: 900 + (e.total / 260) * 1000,
        ease: 'inOutSine',
        onUpdate: () => {
          const [x, y] = pointAt(e, state.t, reverse)
          dot.setAttribute('cx', String(x))
          dot.setAttribute('cy', String(y))
        },
        onComplete: () => {
          dot.remove()
          live--
          pulse(dest)
          if (!running || live >= MAX_PACKETS) return
          const options = adj[dest].filter((k) => k !== edgeIdx)
          const next = options.length ? options[Math.floor(Math.random() * options.length)] : edgeIdx
          launch(dest, next)
        },
      })
      anims.push(a)
    }

    const spawn = () => {
      if (!running || live >= MAX_PACKETS) return
      const i = Math.floor(Math.random() * nodes.length)
      if (!adj[i].length) return
      launch(i, adj[i][Math.floor(Math.random() * adj[i].length)])
    }
    for (let k = 0; k < 4; k++) setTimeout(spawn, k * 350)
    const timer = setInterval(spawn, 650)

    // só anima enquanto o hero está visível e a aba ativa
    const io = new IntersectionObserver(([en]) => (running = en.isIntersecting && !document.hidden))
    io.observe(host)
    const vis = () => (running = !document.hidden)
    document.addEventListener('visibilitychange', vis)

    // Interação: destaca o nó mais próximo do cursor; o clique dispara pacotes a partir dele.
    let hot = -1
    const nearest = (cx: number, cy: number) => {
      const r = host.getBoundingClientRect()
      const x = cx - r.left
      const y = cy - r.top
      if (x < 0 || y < 0 || x > r.width || y > r.height) return { i: -1, d: Infinity }
      let best = -1
      let bd = Infinity
      nodes.forEach((n, i) => {
        const d = Math.hypot(n.x - x, n.y - y)
        if (d < bd) {
          bd = d
          best = i
        }
      })
      return { i: best, d: bd }
    }
    const setHot = (i: number) => {
      if (i === hot) return
      if (hot >= 0) {
        nodeEls.current[hot]?.removeAttribute('data-hot')
        adj[hot].forEach((k) => edgeEls.current[k]?.removeAttribute('data-hot'))
      }
      hot = i
      if (i >= 0) {
        nodeEls.current[i]?.setAttribute('data-hot', '')
        adj[i].forEach((k) => edgeEls.current[k]?.setAttribute('data-hot', ''))
      }
    }
    const move = (e: PointerEvent) => {
      const { i, d } = nearest(e.clientX, e.clientY)
      setHot(d < 140 ? i : -1)
    }
    const down = (e: PointerEvent) => {
      const { i, d } = nearest(e.clientX, e.clientY)
      if (i < 0 || d > 160) return
      pulse(i)
      adj[i].slice(0, 4).forEach((k) => launch(i, k))
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })

    return () => {
      running = false
      clearInterval(timer)
      io.disconnect()
      document.removeEventListener('visibilitychange', vis)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      anims.forEach((a) => a.revert())
      layer.replaceChildren()
    }
  }, [graph, reduced])

  const mask = 'radial-gradient(ellipse at 78% 42%, black 18%, rgba(0,0,0,0.32) 72%)'

  return (
    <div
      ref={box}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      {graph && (
        <svg width={size.w} height={size.h} className="absolute inset-0 [&_[data-hot]]:!stroke-[var(--accent)]">
          <g fill="none" strokeLinejoin="round">
            {graph.edges.map((e, k) => (
              <path
                key={k}
                ref={(el) => {
                  edgeEls.current[k] = el
                }}
                d={`M ${e.pts.map((p) => p.join(' ')).join(' L ')}`}
                stroke="color-mix(in srgb, var(--fg) 16%, transparent)"
                strokeWidth={1}
                style={{ transition: 'stroke 0.3s' }}
              />
            ))}
          </g>
          <g ref={svgPackets} />
          {graph.nodes.map((n, i) => (
            <g
              key={i}
              ref={(el) => {
                nodeEls.current[i] = el
              }}
              transform={`translate(${n.x} ${n.y})`}
              style={{ transition: 'opacity 0.3s' }}
            >
              <circle data-ring r={7} fill="none" stroke="var(--accent)" strokeWidth={1.2} opacity={0} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
              {n.kind === 'db' ? (
                <rect x={-6} y={-6} width={12} height={12} rx={2} fill="var(--bg)" stroke="color-mix(in srgb, var(--fg) 38%, transparent)" strokeWidth={1.2} style={{ transition: 'stroke 0.3s' }} />
              ) : n.kind === 'queue' ? (
                <rect x={-6} y={-6} width={12} height={12} rx={2} transform="rotate(45)" fill="var(--bg)" stroke="color-mix(in srgb, var(--fg) 38%, transparent)" strokeWidth={1.2} style={{ transition: 'stroke 0.3s' }} />
              ) : (
                <circle r={n.label ? 6 : 3.5} fill="var(--bg)" stroke="color-mix(in srgb, var(--fg) 38%, transparent)" strokeWidth={1.2} style={{ transition: 'stroke 0.3s' }} />
              )}
              {n.label && (
                <text x={13} y={3.5} fontSize={10.5} fill="var(--muted)" fontFamily="ui-monospace, 'JetBrains Mono', Consolas, monospace">
                  {n.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      )}
    </div>
  )
}
