import { useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { countries, loading, error };
}