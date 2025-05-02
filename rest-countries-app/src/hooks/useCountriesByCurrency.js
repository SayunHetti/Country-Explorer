// src/hooks/useCountriesByCurrency.js
import { useState, useEffect } from "react";
import { getCountriesByCurrency } from "../api/countries";

const useCountriesByCurrency = (currency) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await getCountriesByCurrency(currency);
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries for this currency");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    if (currency) {
      fetchCountries();
    }
  }, [currency]);

  return { countries, loading, error };
};

export default useCountriesByCurrency;
