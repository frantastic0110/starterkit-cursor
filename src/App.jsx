
import React from 'react'

function Link({ to, children }) {
  return (
    <a href={`#${to}`} className="friends-link">
      {children}
    </a>
  )
}

function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <a href="#/" className="flex items-center gap-3">
          <div className="friends-title text-2xl tracking-widest">IMPROV</div>
          <div className="friends-dots" aria-hidden="true">
            <span className="dot-red"></span>
            <span className="dot-yellow"></span>
            <span className="dot-blue"></span>
            <span className="dot-green"></span>
            <span className="dot-purple"></span>
          </div>
          <div className="friends-title text-2xl tracking-widest">PM</div>
        </a>
        <nav className="flex gap-6 text-sm">
          <Link to="/outcomes">Outcomes</Link>
          <Link to="/about">About</Link>
          <a href="https://" target="_blank" rel="noreferrer" className="friends-link hidden sm:inline">Share</a>
        </nav>
      </div>
    </header>
  )
}

function Home() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="friends-card p-6">
        <h1 className="friends-title text-3xl">Improv for Product Managers</h1>
        <p className="mt-2 text-neutral-700">
          Use classic improv games and rules to facilitate key product management outcomes.
        </p>
        <div className="mt-6 flex gap-3">
          <a href="#/outcomes" className="btn">Explore Outcomes</a>
          <a href="#/about" className="btn">About</a>
        </div>
      </div>
    </section>
  )
}

import { OUTCOMES } from './data/outcomes.js'

function Outcomes() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedType, setSelectedType] = React.useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all')
  const [expandedCards, setExpandedCards] = React.useState(new Set())

  const allTypes = ['all', ...new Set(OUTCOMES.flatMap(o => o.improv.map(g => g.type)))]
  const allDifficulties = ['all', 1, 2, 3]

  const filteredOutcomes = OUTCOMES.filter(outcome => {
    const matchesSearch = outcome.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outcome.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outcome.improv.some(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === 'all' || 
                       outcome.improv.some(g => g.type === selectedType)
    
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             outcome.improv.some(g => g.difficulty === selectedDifficulty)
    
    return matchesSearch && matchesType && matchesDifficulty
  })

  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="friends-title text-2xl">Outcomes ↔ Improv</h2>
      <p className="mt-2 text-neutral-700">Browse core PM deliverables and the improv tools that help.</p>

      {/* Search and Filter Controls */}
      <div className="mt-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search outcomes or improv games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {allTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {allDifficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Levels' : `Level ${difficulty}`}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {allTypes.slice(1).map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(selectedType === type ? 'all' : type)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedType === type 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              {type}
            </button>
          ))}
          {allDifficulties.slice(1).map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? 'all' : difficulty)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedDifficulty === difficulty 
                  ? 'bg-green-500 text-white' 
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              Level {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-neutral-600">
        Showing {filteredOutcomes.length} of {OUTCOMES.length} outcomes
      </div>

      {/* Outcomes Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filteredOutcomes.map((outcome) => (
          <article key={outcome.id} className="friends-card p-5 transition-all duration-200 hover:shadow-md">
            <div 
              className="cursor-pointer"
              onClick={() => toggleCard(outcome.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{outcome.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {outcome.improv.length} games
                  </span>
                  <span className="text-neutral-400">
                    {expandedCards.has(outcome.id) ? '▼' : '▶'}
                  </span>
                </div>
              </div>
              <p className="mt-1 text-sm text-neutral-700">{outcome.description}</p>
            </div>
            
            {expandedCards.has(outcome.id) && (
              <div className="mt-4 space-y-2 animate-fadeIn">
                {outcome.improv.map((game) => (
                  <div key={game.name} className="rounded-lg border border-neutral-200 p-3 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{game.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase tracking-wide text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                          {game.type}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3].map(level => (
                            <div
                              key={level}
                              className={`w-2 h-2 rounded-full ${
                                level <= game.difficulty 
                                  ? 'bg-green-500' 
                                  : 'bg-neutral-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-neutral-500 ml-1">
                            Level {game.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-neutral-700">{game.how}</p>
                    <p className="mt-1 text-xs text-neutral-500">
                      <strong>Why it helps:</strong> {game.why}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      {filteredOutcomes.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          <p>No outcomes found matching your search.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedType('all')
              setSelectedDifficulty('all')
            }}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

function About() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="friends-title text-2xl">About</h2>
      <p className="mt-2 text-neutral-700">
        This site aligns proven improv practices—like Yes, And; Status work; and
        rapid ideation games—with practical product management outcomes such as stakeholder
        alignment, backlog management, and roadmap creation.
      </p>
      <p className="mt-3 text-neutral-700">
        Use it to facilitate workshops, unblock teams, and make collaboration more playful and effective.
      </p>
    </section>
  )
}

function Router() {
  const [hash, setHash] = React.useState(window.location.hash || '#/')
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  let Page = Home
  if (hash.startsWith('#/about')) Page = About
  if (hash.startsWith('#/outcomes')) Page = Outcomes

  return (
    <>
      <Header />
      <Page />
      <footer className="mx-auto max-w-4xl px-4 pb-10 text-xs text-neutral-500">Made with improv ✶</footer>
    </>
  )
}

export default function App() {
  return <Router />
}
