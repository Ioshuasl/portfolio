import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// Entra com desfoque e sobe; ao sair da tela volta a esmaecer, então aparece e some com o scroll.
export const revealProps = (delay = 0) => ({
  initial: { opacity: 0, y: 20, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const } },
  // Margem positiva: começa antes de entrar na tela, então já está nítido quando aparece, mesmo no scroll rápido.
  viewport: { once: false, amount: 0.1, margin: '0px 0px 12% 0px' },
  // Saída rápida, já fora da tela.
  transition: { duration: 0.2, ease: 'easeIn' as const },
})

export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} {...revealProps(delay)}>
      {children}
    </motion.div>
  )
}
