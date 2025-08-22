import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { motion } from 'framer-motion'

function shuffle<T>(arr: T[]) {
  // Fisher-Yates
  let a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const Teams = () => {
  const router = useRouter()
  const { query } = router

  const numTeams: number = parseInt((query.numTeams as string) || '2')
  const players: string[] = typeof query.players === 'string'
    ? (query.players as string).split(',').filter(v => v !== '')
    : []

  const teams = useMemo(() => {
    let list = shuffle(players)
    let out: string[][] = Array.from({ length: numTeams }, () => [])
    for (let i = 0; i < list.length; i++) out[i % numTeams].push(list[i])
    return out
    // eslint-disable-next-line
  }, [JSON.stringify(players), numTeams])

  function goHome() {
    router.push('/')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <h2 className="text-2xl font-bold mb-7 text-white tracking-wide">🎉 Your Random Teams!</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {teams.map((team, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="bg-indigo-800/80 text-white rounded-xl shadow-xl p-6 min-w-[180px]"
          >
            <h3 className="text-xl font-bold mb-3">Team {i + 1}</h3>
            <ul className="space-y-2">
              {team.length === 0
                ? <li className="opacity-75 italic">No members</li>
                : team.map((n, j) => <li key={j} className="text-lg">{n}</li>)
              }
            </ul>
          </motion.div>
        ))}
      </div>
      <button
        onClick={goHome}
        className="mt-10 py-2 px-6 rounded-full bg-gradient-to-r from-pink-500 to-indigo-700 text-white text-lg font-semibold hover:scale-105 transition"
      >Back</button>
    </motion.div>
  )
}

export default Teams
