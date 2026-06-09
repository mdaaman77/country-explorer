const BASE = import.meta.env.VITE_API_URL;

export async function fetchCountries() {
  const res = await fetch(`${BASE}/all?fields=name,flags,region,population,cca3`);
  if (!res.ok) throw new Error("Failed countries");
  return await res.json();
}

export async function fetchCountryByCode(code) {
  const res = await fetch(
    `${BASE}/alpha/${code}?fields=name,flags,region,subregion,population,capital,cca3,continents,currencies,languages`
  );

  if (!res.ok) throw new Error("Failed country");

  const data = await res.json();

  return Array.isArray(data) ? data[0] : data;
}