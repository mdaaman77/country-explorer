import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CountryCard({ country }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      onClick={() => navigate(`/country/${country.cca3}`)}
      className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition"
    >
      <img
        src={country.flags?.png}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold">
          {country.name?.common}
        </h2>

        <p className="text-gray-400 text-sm">
          {country.region}
        </p>

        <p className="text-sm mt-2">
          {country.population?.toLocaleString()}
        </p>
      </div>
    </motion.div>
  );
}