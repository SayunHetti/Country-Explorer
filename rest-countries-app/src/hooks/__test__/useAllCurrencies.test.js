import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useAllCurrencies from "../useAllCurrencies";
import * as countriesApi from "../../api/countries";
// Mock API
vi.mock("../../api/countries", () => ({
  getAllCountries: vi.fn(),
}));

const mockCountries = [
  {
    name: { common: "Country A" },
    currencies: { USD: { name: "United States Dollar" } },
  },
  {
    name: { common: "Country B" },
    currencies: { EUR: { name: "Euro" }, GBP: { name: "British Pound" } },
  },
  {
    name: { common: "Country C" },
    currencies: { USD: { name: "United States Dollar" } }, // Duplicate
  },
  {
    name: { common: "Country D" },
    currencies: null,
  },
  {
    name: { common: "Country E" }, // No currencies
  },
];

describe("useAllCurrencies", () => {
  it("fetches and returns sorted unique currency codes", async () => {
    countriesApi.getAllCountries.mockResolvedValue({
      data: mockCountries,
    });

    const { result } = renderHook(() => useAllCurrencies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currencies).toEqual(["EUR", "GBP", "USD"]);
  });

  it("handles API errors gracefully", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    countriesApi.getAllCountries.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useAllCurrencies());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.currencies).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      "Error fetching currencies:",
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });
});
