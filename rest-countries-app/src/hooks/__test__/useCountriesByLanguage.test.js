// src/hooks/__test__/useCountriesByLanguage.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useCountriesByLanguage from "../useCountriesByLanguage";

// Mock the API module directly from the source path
vi.mock("../../api/countries", () => ({
  getCountriesByLanguage: vi.fn(),
}));

describe("useCountriesByLanguage", () => {
  it("should return loading and then countries data on success", async () => {
    const mockResponse = { data: [{ name: "Germany", language: "German" }] };

    // Ensure the mock function resolves with mockResponse
    const { getCountriesByLanguage } = await import("../../api/countries"); // Use dynamic import
    getCountriesByLanguage.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCountriesByLanguage("German"));

    // Initially, it should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the API call to finish and loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure countries data is updated correctly
    expect(result.current.countries).toEqual(mockResponse.data);
    expect(result.current.error).toBeNull();
  });

  it("should return error if the API call fails", async () => {
    const { getCountriesByLanguage } = await import("../../api/countries"); // Use dynamic import
    getCountriesByLanguage.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useCountriesByLanguage("German"));

    // Initially, it should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the API call to complete and loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure the error message is set
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBe(
      "Failed to fetch countries for this language"
    );
  });

  it("should not make an API call if no language is provided", async () => {
    const { result } = renderHook(() => useCountriesByLanguage(null));

    // Initially, it should be loading as true, but no API call should be made
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
