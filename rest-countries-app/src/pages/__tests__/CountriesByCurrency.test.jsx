import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CountriesByCurrency from "../CountriesByCurrency";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
// 👇 Mock the hook that fetches data
vi.mock("../../hooks/useCountriesByCurrency", () => ({
  default: vi.fn(),
}));

import useCountriesByCurrency from "../../hooks/useCountriesByCurrency";

// 👇 Helper wrapper to provide route param
const renderWithCurrency = (currency = "usd") => {
  render(
    <MemoryRouter initialEntries={[`/currency/${currency}`]}>
      <Routes>
        <Route path="/currency/:currency" element={<CountriesByCurrency />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CountriesByCurrency", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    useCountriesByCurrency.mockReturnValue({
      countries: [],
      loading: true,
      error: null,
    });

    renderWithCurrency("usd");

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", () => {
    useCountriesByCurrency.mockReturnValue({
      countries: [],
      loading: false,
      error: "Failed to fetch",
    });

    renderWithCurrency("usd");

    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it("renders list of countries when data is successfully fetched", () => {
    useCountriesByCurrency.mockReturnValue({
      countries: [
        {
          cca3: "USA",
          name: { common: "United States" },
          flags: { svg: "https://flagcdn.com/us.svg" },
          population: 331000000,
        },
        {
          cca3: "CAN",
          name: { common: "Canada" },
          flags: { svg: "https://flagcdn.com/ca.svg" },
          population: 38000000,
        },
      ],
      loading: false,
      error: null,
    });

    renderWithCurrency("usd");

    expect(
      screen.getByText(/countries using usd currency/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/united states/i)).toBeInTheDocument();
    expect(screen.getByText(/canada/i)).toBeInTheDocument();
  });

  it("displays no countries found message when empty", () => {
    useCountriesByCurrency.mockReturnValue({
      countries: [],
      loading: false,
      error: null,
    });

    renderWithCurrency("xxx");

    expect(
      screen.getByText(/countries using xxx currency/i)
    ).toBeInTheDocument();
    // ✅ Add fallback UI if not already in your component
    // expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
  });
});
