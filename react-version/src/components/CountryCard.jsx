import { useNavigate } from "react-router-dom";

export default function CountryCard({ country }) {
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/country/${country.cca3}`)}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:scale-[1.03] transition duration-300 cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-60" />

      <img
        src={country.flags.png}
        alt={country.name.common}
        className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="p-4 relative z-10">
        <h2 className="text-lg font-semibold text-white">
          {country.name.common}
        </h2>

        <p className="text-sm text-gray-400">
          {country.region}
        </p>

        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p>👥 {country.population.toLocaleString()}</p>
          <p>🏙 {country.capital?.[0] || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}