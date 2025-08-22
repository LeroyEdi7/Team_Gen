import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: [0.61, 1, 0.88, 1] }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black"
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}
export default MyApp
