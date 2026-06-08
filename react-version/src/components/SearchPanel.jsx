export default function SearchPanel({
    search,
    setSearch,
    minPopulation,
    setMinPopulation,
    maxPopulation,
    setMaxPopulation,
    sortBy,
    setSortBy,
  }) {
    return (
      <div className="max-w-5xl mx-auto mt-10 px-6">
  
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">
  
          {/* SEARCH */}
          <input
            className="w-full bg-transparent border border-white/10 px-4 py-3 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search by name, code, currency, region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
  
          {/* FILTERS */}
          <div className="mt-6 flex flex-col md:flex-row gap-6 justify-between">
  
            {/* Population Range */}
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-400 mb-1">
                Population Range
              </span>
  
              <span className="text-sm text-gray-300 mb-2">
                {minPopulation.toLocaleString()} — {maxPopulation.toLocaleString()}
              </span>
  
              <div className="flex gap-2">
                <input
                  type="range"
                  min="0"
                  max="1500000000"
                  step="1000000"
                  value={minPopulation}
                  onChange={(e) => setMinPopulation(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
  
                <input
                  type="range"
                  min="0"
                  max="1500000000"
                  step="1000000"
                  value={maxPopulation}
                  onChange={(e) => setMaxPopulation(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>
            </div>
  
            {/* SORT */}
            <div className="flex flex-col w-full md:w-48">
              <span className="text-xs text-gray-400 mb-1">Sort</span>
  
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-sm"
              >
                <option value="">Default</option>
                <option value="population-desc">Population ↓</option>
                <option value="population-asc">Population ↑</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
              </select>
            </div>
  
          </div>
        </div>
      </div>
    );
  }