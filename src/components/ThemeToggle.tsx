import { AnimatePresence, motion } from 'framer-motion'

export type Theme = 'light' | 'dark'

const icon = { initial: { opacity: 0, rotate: -90, scale: 0.4 }, animate: { opacity: 1, rotate: 0, scale: 1 }, exit: { opacity: 0, rotate: 90, scale: 0.4 } }

// Sol no tema claro, lua no tema escuro; os ícones giram e trocam de lugar.
export default function ThemeToggle({ theme, onToggle, label }: { theme: Theme; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      title={label}
      className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme}
          {...icon}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {theme === 'light' ? (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          ) : (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  )
}
