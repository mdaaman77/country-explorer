import CountryCard from "./CountryCard";
import { motion } from "framer-motion";

export default function CountryGrid({ countries }) {
  if (!Array.isArray(countries)) return null;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </motion.div>
  );
}