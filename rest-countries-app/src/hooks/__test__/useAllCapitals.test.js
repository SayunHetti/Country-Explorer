import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useAllCapitals from "../useAllCapitals";
import * as countriesApi from "../../api/countries";

// Mock data
const mockCountries = [
  { name: { common: "Country A" }, capital: ["Alpha"] },
  { name: { common: "Country B" }, capital: ["Bravo"] },
  { name: { common: "Country C" }, capital: [] },
  { name: { common: "Country D" }, capital: ["Alpha"] }, // Duplicate
  { name: { common: "Country E" } }, // No capital field
];

// Mock getAllCountries
vi.mock("../../api/countries", () => ({
  getAllCountries: vi.fn(),
}));

describe("useAllCapitals", () => {
  it("fetches, filters, and returns sorted unique capitals", async () => {
    countriesApi.getAllCountries.mockResolvedValue({
      data: mockCountries,
    });

    const { result } = renderHook(() => useAllCapitals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.capitals).toEqual(["Alpha", "Bravo"]);
  });

  it("handles API errors gracefully", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    countriesApi.getAllCountries.mockRejectedValue(new Error("API failed"));

    const { result } = renderHook(() => useAllCapitals());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.capitals).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching capitals:",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
