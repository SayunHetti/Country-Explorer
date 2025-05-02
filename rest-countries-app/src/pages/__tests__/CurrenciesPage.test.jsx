import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CurrenciesPage from "../CurrenciesPage";
import * as useAllCurrenciesHook from "../../hooks/useAllCurrencies";
import { MemoryRouter } from "react-router-dom";
import React from "react";
describe("CurrenciesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (ui) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  it("shows loading spinner while fetching currencies", () => {
    vi.spyOn(useAllCurrenciesHook, "default").mockReturnValue({
      currencies: [],
      loading: true,
    });

    renderWithRouter(<CurrenciesPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders currency cards after loading", async () => {
    vi.spyOn(useAllCurrenciesHook, "default").mockReturnValue({
      currencies: ["USD", "EUR", "JPY"],
      loading: false,
    });

    renderWithRouter(<CurrenciesPage />);

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("JPY")).toBeInTheDocument();
  });

  it("filters currencies based on search input", async () => {
    vi.spyOn(useAllCurrenciesHook, "default").mockReturnValue({
      currencies: ["USD", "EUR", "JPY"],
      loading: false,
    });

    renderWithRouter(<CurrenciesPage />);
    const searchInput = screen.getByPlaceholderText(/search for a currency/i);

    fireEvent.change(searchInput, { target: { value: "us" } });

    expect(screen.getByText("USD")).toBeInTheDocument();
    expect(screen.queryByText("EUR")).not.toBeInTheDocument();
  });

  it("shows fallback message when no currency matches search", () => {
    vi.spyOn(useAllCurrenciesHook, "default").mockReturnValue({
      currencies: ["USD", "EUR", "JPY"],
      loading: false,
    });

    renderWithRouter(<CurrenciesPage />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "xyz" },
    });

    expect(screen.getByText(/no currencies found/i)).toBeInTheDocument();
  });
});
