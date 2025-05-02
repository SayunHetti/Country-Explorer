import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useAllLanguages from "../useAllLanguages";
import * as countriesApi from "../../api/countries";

// Mock the countries API module
vi.mock("../../api/countries", () => ({
  getAllCountries: vi.fn(),
}));

const mockCountries = [
  {
    name: { common: "Country A" },
    languages: { eng: "English", fra: "French" },
  },
  {
    name: { common: "Country B" },
    languages: { spa: "Spanish", deu: "German" },
  },
  {
    name: { common: "Country C" },
    languages: { eng: "English" }, // Duplicate
  },
  {
    name: { common: "Country D" }, // No languages
  },
];

describe("useAllLanguages", () => {
  it("fetches and returns sorted unique languages", async () => {
    countriesApi.getAllCountries.mockResolvedValue({
      data: mockCountries,
    });

    const { result } = renderHook(() => useAllLanguages());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.languages).toEqual([
      "English",
      "French",
      "German",
      "Spanish",
    ]);
  });

  it("handles API errors gracefully", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    countriesApi.getAllCountries.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useAllLanguages());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.languages).toEqual([]);
    expect(errorSpy).toHaveBeenCalledWith(
      "Error fetching languages:",
      expect.any(Error)
    );

    errorSpy.mockRestore();
  });
});
