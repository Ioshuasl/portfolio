import type { CSSProperties } from 'react'
import { techIcons } from '../techIcons'

// Ícone monocromático (herda a cor do texto) que ganha a cor da marca no hover.
export default function TechChip({ name, icon }: { name: string; icon?: string }) {
  const meta = icon ? techIcons[icon] : undefined
  const style = meta
    ? ({
        '--brand': meta.hex,
        maskImage: `url(/icons/${icon}.svg)`,
        WebkitMaskImage: `url(/icons/${icon}.svg)`,
      } as CSSProperties)
    : undefined

  return (
    <li className="group flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:border-fg/30">
      {meta && (
        <span
          aria-hidden
          className="h-4 w-4 bg-muted transition-colors [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain] group-hover:bg-[var(--brand)]"
          style={style}
        />
      )}
      {name}
    </li>
  )
}
