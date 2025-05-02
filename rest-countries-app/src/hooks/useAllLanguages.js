// src/hooks/useAllLanguages.js
import { useState, useEffect } from "react";
import { getAllCountries } from "../api/countries";

const useAllLanguages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await getAllCountries();
        const allCountries = response.data;

        const languageSet = new Set();
        allCountries.forEach((country) => {
          if (country.languages) {
            Object.values(country.languages).forEach((lang) => {
              languageSet.add(lang);
            });
          }
        });

        setLanguages(Array.from(languageSet).sort());
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading };
};

export default useAllLanguages;
