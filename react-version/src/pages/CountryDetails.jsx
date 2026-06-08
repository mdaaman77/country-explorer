import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryByCode } from "../api/countries";

export default function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);
        setCountry(data);
      } catch (err) {
        setError("Failed to load country");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-400">
        {error || "Country not found"}
      </div>
    );
  }

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";

  return (
    <div className="min-h-screen relative text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#111827] to-[#0b0f1a]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src={country.flags.png}
            alt={country.name.common}
            className="rounded-2xl shadow-lg"
          />

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {country.name.common}
            </h1>

            <p className="text-gray-400 mb-6">
              {country.name.official}
            </p>

            <div className="space-y-2 text-sm">
              <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Area:</strong> {country.area} km²</p>
              <p><strong>Languages:</strong> {languages}</p>
              <p><strong>Currencies:</strong> {currencies}</p>
              <p><strong>Continent:</strong> {country.continents?.[0]}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}