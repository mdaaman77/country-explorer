import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCountryByCode } from "../api/countries";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const leftAnim = {
  hidden: { x: -80, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

const rightAnim = {
  hidden: { x: 80, opacity: 0 },
  show: { x: 0, opacity: 1 },
};

export default function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await fetchCountryByCode(code);
        if (active) setCountry(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => (active = false);
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b0f1a]">
        Loading...
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-[#0b0f1a]">
        No data
      </div>
    );
  }

  // SAFE DERIVED FIELDS
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ""}`)
        .join(", ")
    : "N/A";

  const timezones = country.timezones?.join(", ") || "N/A";

  const borders = country.borders?.join(", ") || "None";

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white relative overflow-hidden">

      {/* background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[140px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-5 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition"
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT FLAG */}
          <motion.div
            variants={leftAnim}
            initial="hidden"
            animate="show"
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img
              src={country.flags?.png}
              alt={country.name?.common}
              className="w-full h-[280px] object-cover"
            />
          </motion.div>

          {/* RIGHT DETAILS */}
          <motion.div
            variants={rightAnim}
            initial="hidden"
            animate="show"
          >
            <h1 className="text-4xl font-bold">
              {country.name?.common}
            </h1>

            <p className="text-gray-400 mt-1 mb-6">
              {country.name?.official}
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 gap-4"
            >
              <Info label="Capital" value={country.capital?.[0]} />
              <Info label="Region" value={country.region} />
              <Info label="Subregion" value={country.subregion} />
              <Info label="Population" value={country.population?.toLocaleString()} />
              <Info label="Area (km²)" value={country.area} />
              <Info label="Continent" value={country.continents?.[0]} />
              <Info label="Languages" value={languages} />
              <Info label="Currencies" value={currencies} />
              <Info label="Timezones" value={timezones} />
              <Info label="Borders" value={borders} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <motion.div
      variants={item}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
    >
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm mt-1">{value || "N/A"}</p>
    </motion.div>
  );
}