import { EMAIL, GITHUB_URL, LINKEDIN, RESUME_URL, WHATSAPP, type Content, type Lang } from '../content'

const MESSAGE: Record<Lang, string> = {
  pt: 'Olá, Ioshua! Vi seu portfólio e tenho um projeto para conversar.',
  en: 'Hi Ioshua! I saw your portfolio and have a project to talk about.',
}

export default function Contact({ t, lang }: { t: Content['contact']; lang: Lang }) {
  const rows = [
    {
      icon: 'whatsapp',
      title: t.project,
      value: `WhatsApp · ${WHATSAPP.display}`,
      href: `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(MESSAGE[lang])}`,
      external: true,
    },
    { icon: 'linkedin', title: t.role, value: 'LinkedIn · linkedin.com/in/ioshua-souza', href: LINKEDIN, external: true },
    { icon: 'mail', title: lang === 'pt' ? 'E-mail' : 'Email', value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    ...(RESUME_URL[lang] ? [{ icon: 'mail', title: t.resume, value: 'PDF', href: RESUME_URL[lang], external: true }] : []),
    ...(GITHUB_URL ? [{ icon: 'mail', title: t.github, value: GITHUB_URL.replace('https://', ''), href: GITHUB_URL, external: true }] : []),
  ]

  return (
    <div>
      <p className="mb-8 text-xl text-muted sm:text-2xl">{t.lead}</p>
      <ul className="border-t border-line">
        {rows.map((r) => (
          <li key={r.title} className="border-b border-line">
            <a
              href={r.href}
              {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-center gap-4 py-4 transition-[padding] duration-300 hover:pl-2"
            >
              <span
                aria-hidden
                className="h-5 w-5 shrink-0 bg-muted transition-colors [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] group-hover:bg-accent"
                style={{ maskImage: `url(/icons/${r.icon}.svg)`, WebkitMaskImage: `url(/icons/${r.icon}.svg)` }}
              />
              <span className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
                <span className="text-lg font-medium sm:w-44 sm:shrink-0">{r.title}</span>
                <span className="min-w-0 truncate text-sm text-muted transition-colors group-hover:text-fg sm:text-base">{r.value}</span>
              </span>
              <span
                aria-hidden
                className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
