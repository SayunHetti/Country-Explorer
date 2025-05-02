// src/hooks/useAllCurrencies.js
import { useState, useEffect } from "react";
import { getAllCountries } from "../api/countries";

const useAllCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await getAllCountries();
        const allCountries = response.data;

        const currencySet = new Set();
        allCountries.forEach((country) => {
          if (country.currencies) {
            Object.keys(country.currencies).forEach((code) => {
              currencySet.add(code);
            });
          }
        });

        setCurrencies(Array.from(currencySet).sort());
      } catch (error) {
        console.error("Error fetching currencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading };
};

export default useAllCurrencies;
