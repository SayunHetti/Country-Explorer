import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguagesPage from "../LanguagesPage";
import * as languageHook from "../../hooks/useAllLanguages";
import { BrowserRouter } from "react-router-dom";
import React from "react";
// Helper to wrap with router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("LanguagesPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays loading spinner when loading is true", () => {
    vi.spyOn(languageHook, "default").mockReturnValue({
      languages: [],
      loading: true,
    });

    renderWithRouter(<LanguagesPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders language cards when languages are loaded", () => {
    vi.spyOn(languageHook, "default").mockReturnValue({
      languages: ["English", "Spanish", "French"],
      loading: false,
    });

    renderWithRouter(<LanguagesPage />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Spanish")).toBeInTheDocument();
    expect(screen.getByText("French")).toBeInTheDocument();
  });

  it("filters language list based on search input", () => {
    vi.spyOn(languageHook, "default").mockReturnValue({
      languages: ["English", "Spanish", "French"],
      loading: false,
    });

    renderWithRouter(<LanguagesPage />);
    const input = screen.getByPlaceholderText(/search for a language/i);

    fireEvent.change(input, { target: { value: "sp" } });

    expect(screen.queryByText("Spanish")).toBeInTheDocument();
    expect(screen.queryByText("English")).not.toBeInTheDocument();
    expect(screen.queryByText("French")).not.toBeInTheDocument();
  });

  it("shows 'No languages found' when filter yields no result", () => {
    vi.spyOn(languageHook, "default").mockReturnValue({
      languages: ["English", "Spanish"],
      loading: false,
    });

    renderWithRouter(<LanguagesPage />);
    fireEvent.change(screen.getByPlaceholderText(/search/i), {
      target: { value: "zzz" },
    });

    expect(screen.getByText("No languages found.")).toBeInTheDocument();
  });
});
