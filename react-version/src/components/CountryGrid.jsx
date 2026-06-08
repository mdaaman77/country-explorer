import CountryCard from "./CountryCard";

export default function CountryGrid({ countries }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {countries.map((c) => (
        <CountryCard key={c.cca3} country={c} />
      ))}
    </div>
  );
}