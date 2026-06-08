const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCountries() {
  const res = await fetch(
    `${BASE_URL}/all?fields=name,flags,region,population,capital,cca3`
  );

  if (!res.ok) throw new Error("Failed to fetch countries");

  return res.json();
}

export async function fetchCountryByCode(code) {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);

  if (!res.ok) throw new Error("Failed to fetch country");

  const data = await res.json();
  return data[0];
}