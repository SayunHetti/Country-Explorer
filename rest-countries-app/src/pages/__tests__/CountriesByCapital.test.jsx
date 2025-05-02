import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountriesByCapital from "../CountriesByCapital";
import React from "react";
// 👇 Mock the custom hook
vi.mock("../../hooks/useCountriesByCapital", () => ({
  default: vi.fn(),
}));
import useCountriesByCapital from "../../hooks/useCountriesByCapital";

// Helper function to wrap component with router + param
const renderWithCapital = (capital = "paris") => {
  render(
    <MemoryRouter initialEntries={[`/capital/${capital}`]}>
      <Routes>
        <Route path="/capital/:capital" element={<CountriesByCapital />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CountriesByCapital", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    useCountriesByCapital.mockReturnValue({
      countries: [],
      loading: true,
      error: null,
    });

    renderWithCapital("paris");

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays an error message on fetch failure", () => {
    useCountriesByCapital.mockReturnValue({
      countries: [],
      loading: false,
      error: "Something went wrong",
    });

    renderWithCapital("paris");

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders list of countries on success", () => {
    useCountriesByCapital.mockReturnValue({
      countries: [
        {
          cca3: "FRA",
          name: { common: "France" },
          flags: { svg: "https://flagcdn.com/fr.svg" },
          population: 67000000,
        },
      ],
      loading: false,
      error: null,
    });

    renderWithCapital("paris");

    expect(
      screen.getByText(/countries with capital paris/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/france/i)).toBeInTheDocument();
  });

  //   it("shows 'no countries found' message if result is empty", () => {
  //     useCountriesByCapital.mockReturnValue({
  //       countries: [],
  //       loading: false,
  //       error: null,
  //     });

  //     renderWithCapital("unknown");

  //     expect(
  //       screen.getByText(/countries with capital unknown/i)
  //     ).toBeInTheDocument();
  //     // Add this to component for test to pass
  //     expect(screen.getByText()).toBeInTheDocument();
  //   });
});
