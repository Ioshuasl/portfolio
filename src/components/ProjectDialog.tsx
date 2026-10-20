import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { WorkItem, WorkLabels } from '../content'
import TechChip from './TechChip'

type Props = { item: WorkItem | null; labels: WorkLabels; media: ReactNode; onClose: () => void }

// Detalhes de um projeto em um dialog acessível: Esc e clique fora fecham, o foco fica preso dentro e volta ao botão de origem.
export default function ProjectDialog({ item, labels, media, onClose }: Props) {
  const reduce = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const openedAt = useRef(0)
  const isOpen = !!item

  useEffect(() => {
    if (!isOpen) return
    openedAt.current = performance.now()
    const opener = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const f = panel.current.querySelectorAll<HTMLElement>('button, a[href]')
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [isOpen, onClose])

  const d = item?.detail
  return createPortal(
    <AnimatePresence>
      {item && d && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-40 flex items-end justify-center bg-bg/70 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          // No toque, o clique sintetizado após o tap que abriu o dialog cairia aqui e o fecharia na hora.
          onClick={() => {
            if (performance.now() - openedAt.current > 400) onClose()
          }}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-3xl themed-scroll overflow-y-auto overscroll-contain rounded-t-2xl border border-line bg-bg shadow-2xl sm:rounded-2xl"
            initial={reduce ? false : { opacity: 0, y: 32, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, filter: 'blur(6px)', transition: { duration: 0.18 } }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeBtn}
              onClick={onClose}
              aria-label={labels.close}
              className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/80 text-lg backdrop-blur transition hover:border-accent hover:text-accent"
            >
              ✕
            </button>

            <div className="aspect-[16/10] w-full overflow-hidden bg-fg/[0.04]">{media}</div>

            <div className="space-y-8 p-6 sm:p-10">
              <header>
                <h3 id="project-dialog-title" className="text-3xl font-medium tracking-tight sm:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{item.tags}</p>
                <p className="mt-4 text-lg">{d.summary}</p>
              </header>

              {d.status && (
                <Block title={labels.status}>
                  <p className="text-muted">{d.status}</p>
                </Block>
              )}
              {d.context && (
                <Block title={labels.context}>
                  <p className="text-muted">{d.context}</p>
                </Block>
              )}

              <Block title={labels.features}>
                <ul className="space-y-2 text-muted">
                  {d.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Block>

              {d.stack.length > 0 && (
                <Block title={labels.stack}>
                  <ul className="flex flex-wrap gap-2">
                    {d.stack.map((t) => (
                      <TechChip key={t.name} {...t} />
                    ))}
                  </ul>
                </Block>
              )}

              {d.notes && d.notes.length > 0 && (
                <Block title={labels.notes}>
                  <ul className="space-y-2 text-sm text-muted">
                    {d.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="mb-3 text-xs font-medium tracking-widest text-accent uppercase">{title}</h4>
      {children}
    </section>
  )
}
