import { useState, useMemo } from "react";
import { useCountries } from "../hooks/useCountries";
import SearchPanel from "../components/SearchPanel";
import CountryGrid from "../components/CountryGrid";

export default function Home() {
  const { countries, loading } = useCountries();

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(1500000000);

  const processed = useMemo(() => {
    return countries
      .filter((c) => {
        const q = search.toLowerCase();

        const name = c.name?.common?.toLowerCase() || "";
        const reg = c.region?.toLowerCase() || "";

        const matchSearch =
          name.includes(q) || reg.includes(q);

        const matchRegion = region
          ? reg === region
          : true;

        const matchPopulation =
          c.population >= minPopulation &&
          c.population <= maxPopulation;

        return matchSearch && matchRegion && matchPopulation;
      })
      .sort((a, b) => {
        if (sortBy === "population-asc") return a.population - b.population;
        if (sortBy === "population-desc") return b.population - a.population;
        if (sortBy === "name-asc") return a.name.common.localeCompare(b.name.common);
        if (sortBy === "name-desc") return b.name.common.localeCompare(a.name.common);
        return 0;
      });
  }, [countries, search, region, sortBy, minPopulation, maxPopulation]);

  return (
    <div>
      <SearchPanel
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPopulation={minPopulation}
        setMinPopulation={setMinPopulation}
        maxPopulation={maxPopulation}
        setMaxPopulation={setMaxPopulation}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : processed.length === 0 ? (
          <p className="text-center text-gray-400">No results</p>
        ) : (
          <CountryGrid countries={processed} />
        )}
      </div>
    </div>
  );
}