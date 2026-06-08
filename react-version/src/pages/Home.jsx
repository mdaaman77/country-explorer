import { useState, useMemo } from "react";
import { useCountries } from "../hooks/useCountries";
import Navbar from "../components/Navbar";
import CountryGrid from "../components/CountryGrid";
import SearchPanel from "../components/SearchPanel";

export default function Home() {
  const { countries, loading, error } = useCountries();

  const [search, setSearch] = useState("");
  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(1500000000);
  const [sortBy, setSortBy] = useState("");

  const processedCountries = useMemo(() => {
    const filtered = countries.filter((c) => {
      const query = search.toLowerCase();

      const name = c.name.common?.toLowerCase() || "";
      const code = c.cca3?.toLowerCase() || "";

      const currency = c.currencies
        ? Object.values(c.currencies)
            .map((cur) => cur.name.toLowerCase())
            .join(" ")
        : "";

      const region = c.region?.toLowerCase() || "";
      const continents = c.continents?.join(" ").toLowerCase() || "";

      const matchesSearch =
        name.includes(query) ||
        code.includes(query) ||
        currency.includes(query) ||
        region.includes(query) ||
        continents.includes(query);

      const matchesPopulation =
        c.population >= minPopulation &&
        c.population <= maxPopulation;

      return matchesSearch && matchesPopulation;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "population-asc":
          return a.population - b.population;
        case "population-desc":
          return b.population - a.population;
        case "name-asc":
          return a.name.common.localeCompare(b.name.common);
        case "name-desc":
          return b.name.common.localeCompare(a.name.common);
        default:
          return 0;
      }
    });
  }, [countries, search, minPopulation, maxPopulation, sortBy]);

  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* Background (always at bottom) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#0b0f1a]" />
      <div className="absolute top-0 left-0 -z-10 w-72 h-72 bg-indigo-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 -z-10 w-72 h-72 bg-purple-500/20 blur-[120px]" />

      {/* UI */}
      <Navbar />

      <SearchPanel
        search={search}
        setSearch={setSearch}
        minPopulation={minPopulation}
        setMinPopulation={setMinPopulation}
        maxPopulation={maxPopulation}
        setMaxPopulation={setMaxPopulation}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {loading && (
          <div className="flex justify-center mt-20">
            <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 mt-20">
            Something went wrong
          </p>
        )}

        {!loading && !error && processedCountries.length === 0 && (
          <p className="text-center text-gray-400 mt-20">
            No countries found
          </p>
        )}

        {!loading && !error && processedCountries.length > 0 && (
          <CountryGrid countries={processedCountries} />
        )}

      </main>
    </div>
  );
}