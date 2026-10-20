import type { ReactNode } from 'react'
import Reveal from './Reveal'

export default function Section({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-14 sm:scroll-mt-16 sm:py-20">
      <Reveal>
        <h2 className="mb-10 text-3xl font-medium tracking-tight sm:text-4xl">{label}</h2>
        {children}
      </Reveal>
    </section>
  )
}
