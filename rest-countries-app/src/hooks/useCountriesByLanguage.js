// src/hooks/useCountriesByLanguage.js
import { useState, useEffect } from "react";
import { getCountriesByLanguage } from "../api/countries";

const useCountriesByLanguage = (language) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await getCountriesByLanguage(language);
        setCountries(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch countries for this language");
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    if (language) {
      fetchCountries();
    }
  }, [language]);

  return { countries, loading, error };
};

export default useCountriesByLanguage;
