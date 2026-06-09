import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await fetchCountries();

        if (Array.isArray(data) && active) {
          setCountries(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => (active = false);
  }, []);

  return { countries, loading };
}