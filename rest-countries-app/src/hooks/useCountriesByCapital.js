// src/hooks/useCountriesByCapital.js
import { useState, useEffect } from "react";
import { getCountriesByCapital } from "../api/countries";

const useCountriesByCapital = (capital) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await getCountriesByCapital(capital);
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries for this capital");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    if (capital) {
      fetchCountries();
    }
  }, [capital]);

  return { countries, loading, error };
};

export default useCountriesByCapital;
