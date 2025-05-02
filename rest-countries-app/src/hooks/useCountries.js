import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1";

const fields =
  "name,flags,capital,region,subregion,currencies,population,languages,cca3";

export const useCountries = (filter = {}) => {
  const { type = "all", value = "" } = filter;

  const url =
    type === "all"
      ? `${BASE_URL}/all?fields=${fields}`
      : `${BASE_URL}/${type}/${value}?fields=${fields}`;

  return useQuery({
    queryKey: ["countries", type, value],
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    },
  });
};
