import { useEffect, useState } from 'react'
import type { Lang } from '../content'

type Link = { id: string; label: string }

// Navegação fixa no topo; destaca a seção visível.
export default function Header({ name, role, links, lang, setLang }: { name: string; role: string; links: Link[]; lang: Lang; setLang: (l: Lang) => void }) {
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const els = links.map((l) => document.getElementById(l.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [links])

  return (
    <header className="fixed inset-x-0 top-0 z-10 bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-8 px-6 pt-4 pb-2 text-sm sm:flex-nowrap sm:py-4">
        <a href="#top" className="font-medium">
          {name} <span className="hidden text-muted lg:inline">· {role}</span>
        </a>
        <button
          onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          className="text-muted transition hover:text-accent sm:order-last"
          aria-label="Toggle language"
        >
          {lang === 'pt' ? 'EN' : 'PT'}
        </button>
        <nav className="-mx-6 mt-2 flex w-[calc(100%+3rem)] gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:mx-0 sm:gap-6 sm:[mask-image:none] sm:mt-0 sm:ml-auto sm:w-auto sm:pb-0">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`whitespace-nowrap transition-colors hover:text-fg ${current === l.id ? 'text-accent' : 'text-muted'}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
