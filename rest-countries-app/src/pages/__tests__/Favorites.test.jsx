import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Favorites from "../Favorites";
import * as AuthContext from "../../context/AuthContext";
import * as useFavoritesHook from "../../hooks/useFavorites";
import * as countriesApi from "../../api/countries";
import React from "react";
// Mock CountryCard component
vi.mock("../../components/CountryCard", () => ({
  default: ({ country }) => <div>{country.name.common}</div>,
}));

describe("Favorites Page", () => {
  const mockUser = { uid: "123", email: "test@example.com" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays login prompt if user is not logged in", () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: null });

    render(<Favorites />);

    expect(
      screen.getByText(/you must be logged in to view favorites/i)
    ).toBeInTheDocument();
  });

  it("shows loading spinner when fetching favorites", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: mockUser });
    vi.spyOn(useFavoritesHook, "useFavorites").mockReturnValue({
      getFavorites: vi.fn(() => new Promise(() => {})), // never resolves
      removeFavorite: vi.fn(),
    });

    render(<Favorites />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders favorite countries after fetching", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: mockUser });

    const mockFavorites = ["USA", "FRA"];
    const mockCountryData = [
      { cca3: "USA", name: { common: "United States" } },
      { cca3: "FRA", name: { common: "France" } },
    ];

    vi.spyOn(useFavoritesHook, "useFavorites").mockReturnValue({
      getFavorites: vi.fn().mockResolvedValue(mockFavorites),
      removeFavorite: vi.fn(),
    });

    vi.spyOn(countriesApi, "getCountryByCode").mockImplementation((code) => {
      const data = mockCountryData.find((c) => c.cca3 === code);
      return Promise.resolve({ data: [data] });
    });

    render(<Favorites />);

    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );
    expect(screen.getByText("France")).toBeInTheDocument();
  });

  it("shows message when no favorites exist", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: mockUser });

    vi.spyOn(useFavoritesHook, "useFavorites").mockReturnValue({
      getFavorites: vi.fn().mockResolvedValue([]),
      removeFavorite: vi.fn(),
    });

    render(<Favorites />);

    await waitFor(() =>
      expect(screen.getByText(/no favorites added yet/i)).toBeInTheDocument()
    );
  });

  it("removes a favorite when button is clicked", async () => {
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({ user: mockUser });

    const getFavorites = vi.fn().mockResolvedValue(["USA"]);
    const removeFavorite = vi.fn().mockResolvedValue();

    vi.spyOn(useFavoritesHook, "useFavorites").mockReturnValue({
      getFavorites,
      removeFavorite,
    });

    vi.spyOn(countriesApi, "getCountryByCode").mockResolvedValue({
      data: [{ cca3: "USA", name: { common: "United States" } }],
    });

    render(<Favorites />);

    await waitFor(() =>
      expect(screen.getByText("United States")).toBeInTheDocument()
    );

    fireEvent.click(
      screen.getByRole("button", { name: /remove from favorites/i })
    );

    await waitFor(() =>
      expect(screen.queryByText("United States")).not.toBeInTheDocument()
    );

    expect(removeFavorite).toHaveBeenCalledWith("USA");
  });
});
