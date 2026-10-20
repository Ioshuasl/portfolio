import { useEffect, useState } from 'react'
import { content, type Lang } from './content'
import Hero from './components/Hero'
import Section from './components/Section'
import Header from './components/Header'
import TechChip from './components/TechChip'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import ProjectCarousel from './components/ProjectCarousel'

const initialLang = (): Lang => {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // localStorage indisponível
  }
  return navigator.language.startsWith('pt') ? 'pt' : 'en'
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const t = content[lang]

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
      <Header
        name="Ioshua Souza Lopes"
        role={t.role}
        lang={lang}
        setLang={setLang}
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
              {t.about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="first:text-fg [&:not(:first-child)]:text-muted">
                  {p}
                </p>
              ))}
            </div>
            <dl className="space-y-5 text-sm">
              {t.about.facts.map((f) => (
                <div key={f.k}>
                  <dt className="text-muted">{f.k}</dt>
                  <dd className="mt-0.5">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section id="work" label={t.work.label}>
          <ProjectCarousel items={t.work.items} soon={t.work.soon} />
        </Section>

        <Section id="how" label={t.how.label}>
          <dl className="divide-y divide-line">
            {t.how.rows.map((r) => (
              <div key={r.k} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="pt-1.5 text-muted">{r.k}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {r.tech.map((x) => (
                      <TechChip key={x.name} {...x} />
                    ))}
                  </ul>
                  {r.note && <p className="mt-3 text-sm text-muted">{r.note}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="path" label={t.path.label}>
          <p className="mb-12 max-w-md font-serif text-2xl text-muted italic sm:text-3xl">{t.path.lead}</p>
          <Timeline rows={t.path.rows} nowLabel={t.path.now} legend={t.path.legend} />
        </Section>

        <Section id="contact" label={t.contact.label}>
          <Contact t={t.contact} lang={lang} />
        </Section>
      </main>

      <footer className="border-t border-line py-8 text-sm text-muted">© {new Date().getFullYear()} Ioshua Souza Lopes</footer>
    </div>
  )
}
