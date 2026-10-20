import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content, type Lang } from './content'
import Hero from './components/Hero'
import Section from './components/Section'
import Reveal from './components/Reveal'
import Header from './components/Header'
import TechChip from './components/TechChip'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import ProjectCarousel from './components/ProjectCarousel'
import type { Theme } from './components/ThemeToggle'

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // localStorage indisponível
  }
  return navigator.language.startsWith('pt') ? 'pt' : 'en'
}

const initialTheme = (): Theme => {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // localStorage indisponível
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [theme, setTheme] = useState<Theme>(initialTheme)
  // Cor do tema anterior, mostrada por cima e esmaecida para suavizar a troca.
  const [veil, setVeil] = useState<{ id: number; color: string } | null>(null)
  const reduce = useReducedMotion()
  const t = content[lang]

  const toggleTheme = () => {
    if (!reduce) setVeil({ id: Date.now(), color: getComputedStyle(document.body).backgroundColor })
    setTheme((v) => (v === 'dark' ? 'light' : 'dark'))
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // localStorage indisponível
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // localStorage indisponível
    }
  }, [lang])

  return (
    <div className="mx-auto max-w-5xl px-6">
      <AnimatePresence>
        {veil && (
          <motion.div
            key={veil.id}
            aria-hidden
            className="pointer-events-none fixed inset-0 z-50"
            style={{ background: veil.color }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            onAnimationComplete={() => setVeil(null)}
          />
        )}
      </AnimatePresence>
      <Header
        name="Ioshua Souza Lopes"
        role={t.role}
        lang={lang}
        setLang={setLang}
        theme={theme}
        onToggleTheme={toggleTheme}
        links={[
          { id: 'about', label: t.about.label },
          { id: 'work', label: t.work.label },
          { id: 'how', label: t.how.label },
          { id: 'path', label: t.path.label },
          { id: 'contact', label: t.contact.label },
        ]}
      />

      <main>
        <Hero t={t.hero} />

        <Section id="about" label={t.about.label}>
          <div className="grid gap-10 sm:grid-cols-[1fr_18rem] sm:gap-16">
            <div className="space-y-5 text-lg leading-relaxed sm:text-xl">
              {t.about.paragraphs.map((p, i) => (
                <Reveal key={p.slice(0, 24)} delay={i * 0.08}>
                  <p className={i === 0 ? 'text-fg' : 'text-muted'}>{p}</p>
                </Reveal>
              ))}
            </div>
            <dl className="space-y-5 text-sm">
              {t.about.facts.map((f, i) => (
                <Reveal key={f.k} delay={0.1 + i * 0.07}>
                  <dt className="text-muted">{f.k}</dt>
                  <dd className="mt-0.5">{f.v}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Section>

        <Section id="work" label={t.work.label}>
          <Reveal>
            <ProjectCarousel items={t.work.items} soon={t.work.soon} />
          </Reveal>
        </Section>

        <Section id="how" label={t.how.label}>
          <dl className="divide-y divide-line">
            {t.how.rows.map((r) => (
              <Reveal key={r.k} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="pt-1.5 text-muted">{r.k}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {r.tech.map((x) => (
                      <TechChip key={x.name} {...x} />
                    ))}
                  </ul>
                  {r.note && <p className="mt-3 text-sm text-muted">{r.note}</p>}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Section>

        <Section id="path" label={t.path.label}>
          <Reveal>
            <p className="mb-12 max-w-md font-serif text-2xl text-muted italic sm:text-3xl">{t.path.lead}</p>
          </Reveal>
          <Timeline rows={t.path.rows} nowLabel={t.path.now} legend={t.path.legend} />
        </Section>

        <Section id="contact" label={t.contact.label}>
          <Reveal>
            <Contact t={t.contact} lang={lang} />
          </Reveal>
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">© {new Date().getFullYear()} Ioshua Souza Lopes</footer>
    </div>
  )
}
