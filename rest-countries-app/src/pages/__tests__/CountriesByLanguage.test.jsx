import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import CountriesByLanguage from "../CountriesByLanguage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
// ⛳ Correct path to the hook
import useCountriesByLanguage from "../../hooks/useCountriesByLanguage";

// ✅ Mock the default export
vi.mock("../../hooks/useCountriesByLanguage", () => ({
  default: vi.fn(),
}));

const renderWithRouter = (ui, route = "/countries-by-language/english") => {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/countries-by-language/:language" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CountriesByLanguage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    useCountriesByLanguage.mockReturnValue({
      countries: [],
      loading: true,
      error: null,
    });

    renderWithRouter(<CountriesByLanguage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays an error message when there is an error", async () => {
    const errorMessage = "Failed to fetch countries";

    useCountriesByLanguage.mockReturnValue({
      countries: [],
      loading: false,
      error: errorMessage,
    });

    renderWithRouter(<CountriesByLanguage />);
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it("renders list of countries when data is successfully fetched", async () => {
    const mockCountries = [
      {
        cca3: "USA",
        name: { common: "United States" },
        flags: { svg: "https://flagcdn.com/us.svg" },
        population: 331002651, // ✅ Add this
      },
      {
        cca3: "CAN",
        name: { common: "Canada" },
        flags: { svg: "https://flagcdn.com/ca.svg" },
        population: 37742154, // ✅ Add this
      },
    ];

    useCountriesByLanguage.mockReturnValue({
      countries: mockCountries,
      loading: false,
      error: null,
    });

    renderWithRouter(<CountriesByLanguage />);
    expect(await screen.findByText("United States")).toBeInTheDocument();
    expect(screen.getByText("Canada")).toBeInTheDocument();
  });
});
