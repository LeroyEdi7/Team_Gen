import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Home = () => {
  const [numTeams, setNumTeams] = useState(2)
  const [players, setPlayers] = useState(['', '', '', ''])
  const router = useRouter()

  const handlePlayersChange = (idx: number, val: string) => {
    const newPlayers = [...players]
    newPlayers[idx] = val
    setPlayers(newPlayers)
  }

  const handleTeamOrPlayersChange = (count: number) => {
    let newPlayers = [...players]
    if (count < newPlayers.length)
      newPlayers = newPlayers.slice(0, count)
    else
      newPlayers = [...newPlayers, ...Array(count - newPlayers.length).fill('')]
    setPlayers(newPlayers)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nonEmptyPlayers = players.filter(p => p.trim() !== '')
    router.push({
      pathname: '/teams',
      query: {
        numTeams,
        players: nonEmptyPlayers.join(',')
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-[2.8rem] font-bold text-white tracking-tight drop-shadow-lg mb-8 animate-pulse">Team Generator</h1>
      <form onSubmit={onSubmit} className="bg-slate-800 rounded-xl p-8 shadow-2xl w-full max-w-md flex flex-col gap-6">
        <div>
          <label className="block text-white mb-2">Number of Teams:</label>
          <input
            className="w-full p-2 rounded text-lg"
            type="number"
            value={numTeams}
            min={2} max={8}
            onChange={e => setNumTeams(Number(e.target.value))}
            onBlur={e => handleTeamOrPlayersChange(players.length)}
          />
        </div>

        <div className="mb-2">
          <label className="block text-white mb-2">Players (add at least {numTeams}):</label>
          <div className="flex flex-col gap-2">
            {players.map((name, idx) => (
              <input
                key={idx}
                className="p-2 rounded"
                placeholder={`Player ${idx + 1}`}
                value={name}
                onChange={e => handlePlayersChange(idx, e.target.value)}
                required={idx < numTeams}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button type="button" className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 transition"
              onClick={() => handleTeamOrPlayersChange(players.length + 1)}>
              + Add Player
            </button>
            {players.length > numTeams && (
              <button type="button" className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition"
                onClick={() => handleTeamOrPlayersChange(players.length - 1)}>
                - Remove Player
              </button>
            )}
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition">
          Generate Teams!
        </button>
      </form>
    </motion.div>
  )
}
export default Home
