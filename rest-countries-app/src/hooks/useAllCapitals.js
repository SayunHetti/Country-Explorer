// src/hooks/useAllCapitals.js
import { useState, useEffect } from "react";
import { getAllCountries } from "../api/countries";

const useAllCapitals = () => {
  const [capitals, setCapitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCapitals = async () => {
      try {
        const response = await getAllCountries();
        const allCountries = response.data;

        const capitalSet = new Set();
        allCountries.forEach((country) => {
          if (Array.isArray(country.capital) && country.capital.length > 0) {
            capitalSet.add(country.capital[0]);
          }
        });

        setCapitals(Array.from(capitalSet).sort());
      } catch (error) {
        console.error("Error fetching capitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCapitals();
  }, []);

  return { capitals, loading };
};

export default useAllCapitals;
