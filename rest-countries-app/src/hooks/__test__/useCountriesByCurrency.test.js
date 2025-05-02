// src/hooks/__test__/useCountriesByCurrency.test.js
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useCountriesByCurrency from "../useCountriesByCurrency";

// Mock the API module directly from the source path
vi.mock("../../api/countries", () => ({
  getCountriesByCurrency: vi.fn(),
}));

describe("useCountriesByCurrency", () => {
  it("should return loading and then countries data on success", async () => {
    const mockResponse = { data: [{ name: "USA", currency: "USD" }] };

    // Ensure the mock function resolves with mockResponse
    const { getCountriesByCurrency } = await import("../../api/countries"); // Use dynamic import
    getCountriesByCurrency.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useCountriesByCurrency("USD"));

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
    const { getCountriesByCurrency } = await import("../../api/countries"); // Use dynamic import
    getCountriesByCurrency.mockRejectedValueOnce(new Error("API error"));

    const { result } = renderHook(() => useCountriesByCurrency("USD"));

    // Initially, it should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();

    // Wait for the API call to complete and loading to become false
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Ensure the error message is set
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBe(
      "Failed to fetch countries for this currency"
    );
  });

  it("should not make an API call if no currency is provided", async () => {
    const { result } = renderHook(() => useCountriesByCurrency(null));

    // Initially, it should be loading as true, but no API call should be made
    expect(result.current.loading).toBe(true);
    expect(result.current.countries).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
