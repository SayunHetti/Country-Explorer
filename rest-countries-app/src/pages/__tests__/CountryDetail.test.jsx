import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CountryDetail from "../CountryDetail";
import * as api from "../../api/countries";
import * as auth from "../../context/AuthContext";
import * as favoritesHook from "../../hooks/useFavorites";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import React from "react";
// Mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const renderWithRouter = (ui, route = "/country/USA") => {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/country/:code" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("CountryDetail", () => {
  const mockCountry = {
    cca3: "USA",
    name: { common: "United States" },
    flags: { svg: "https://example.com/flag.svg" },
    capital: ["Washington, D.C."],
    region: "Americas",
    subregion: "Northern America",
    population: 331000000,
    languages: { eng: "English" },
    currencies: {
      USD: { name: "United States Dollar", symbol: "$" },
    },
    flag: "🇺🇸",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner initially", () => {
    vi.spyOn(api, "getCountryByCode").mockReturnValue(new Promise(() => {}));
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: null });

    renderWithRouter(<CountryDetail />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders country data after loading", async () => {
    vi.spyOn(api, "getCountryByCode").mockResolvedValue({
      data: [mockCountry],
    });
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: null });

    renderWithRouter(<CountryDetail />);

    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );
    expect(screen.getByText("Washington, D.C.")).toBeInTheDocument();
    expect(screen.getByText(/United States Dollar/)).toBeInTheDocument();
  });

  it("handles missing country gracefully", async () => {
    vi.spyOn(api, "getCountryByCode").mockResolvedValue({ data: [] });
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: null });

    renderWithRouter(<CountryDetail />);

    await waitFor(() => {
      expect(screen.getByText(/country not found/i)).toBeInTheDocument();
    });
  });

  it("adds country to favorites when user is logged in", async () => {
    vi.spyOn(api, "getCountryByCode").mockResolvedValue({
      data: [mockCountry],
    });
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: { uid: "123" } });

    const addFavorite = vi.fn().mockResolvedValue();
    const removeFavorite = vi.fn();
    const getFavorites = vi.fn().mockResolvedValue([]);
    vi.spyOn(favoritesHook, "useFavorites").mockReturnValue({
      getFavorites,
      addFavorite,
      removeFavorite,
    });

    renderWithRouter(<CountryDetail />);

    await waitFor(() => screen.getByText("Add to Favorites"));

    fireEvent.click(screen.getByText(/add to favorites/i));
    await waitFor(() => expect(addFavorite).toHaveBeenCalledWith("USA"));
  });

  it("removes country from favorites when already favorited", async () => {
    vi.spyOn(api, "getCountryByCode").mockResolvedValue({
      data: [mockCountry],
    });
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: { uid: "123" } });

    const addFavorite = vi.fn();
    const removeFavorite = vi.fn().mockResolvedValue();
    const getFavorites = vi.fn().mockResolvedValue(["USA"]);
    vi.spyOn(favoritesHook, "useFavorites").mockReturnValue({
      getFavorites,
      addFavorite,
      removeFavorite,
    });

    renderWithRouter(<CountryDetail />);

    await waitFor(() => screen.getByText("Remove from Favorites"));
    fireEvent.click(screen.getByText(/remove from favorites/i));
    await waitFor(() => expect(removeFavorite).toHaveBeenCalledWith("USA"));
  });

  it("does not show favorite button when user is not logged in", async () => {
    vi.spyOn(api, "getCountryByCode").mockResolvedValue({
      data: [mockCountry],
    });
    vi.spyOn(auth, "useAuth").mockReturnValue({ user: null });

    renderWithRouter(<CountryDetail />);

    await waitFor(() => screen.getByText("United States"));
    expect(screen.queryByText(/add to favorites/i)).not.toBeInTheDocument();
  });
});
