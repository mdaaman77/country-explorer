import { motion } from "framer-motion";

export default function SearchPanel({
  search,
  setSearch,
  region,
  setRegion,
  sortBy,
  setSortBy,
  minPopulation,
  setMinPopulation,
  maxPopulation,
  setMaxPopulation,
}) {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="max-w-7xl mx-auto px-6 mt-8"
    >
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

        <div className="grid md:grid-cols-4 gap-6">

          {/* search */}
          <input
            className="bg-transparent border border-white/10 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-400"
            placeholder="Search by name or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* region */}
          <select
            className="bg-transparent border border-white/10 px-4 py-3 rounded-lg"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="americas">Americas</option>
            <option value="oceania">Oceania</option>
          </select>

          {/* sort */}
          <select
            className="bg-transparent border border-white/10 px-4 py-3 rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="population-asc">Population ↑</option>
            <option value="population-desc">Population ↓</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>

          {/* population slider */}
          <div>
            <p className="text-xs text-gray-400 mb-1">
              Population: {minPopulation} - {maxPopulation}
            </p>

            <input
              type="range"
              min="0"
              max="1500000000"
              value={minPopulation}
              onChange={(e) =>
                setMinPopulation(Math.min(+e.target.value, maxPopulation))
              }
              className="w-full"
            />

            <input
              type="range"
              min="0"
              max="1500000000"
              value={maxPopulation}
              onChange={(e) =>
                setMaxPopulation(Math.max(+e.target.value, minPopulation))
              }
              className="w-full mt-2"
            />
          </div>

        </div>
      </div>
    </motion.div>
  );
}