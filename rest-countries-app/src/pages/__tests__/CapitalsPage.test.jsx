import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CapitalsPage from "../CapitalsPage";
import { MemoryRouter } from "react-router-dom";
import React from "react";
// Mock the custom hook
vi.mock("../../hooks/useAllCapitals", () => ({
  default: vi.fn(),
}));
import useAllCapitals from "../../hooks/useAllCapitals";

// Helper to render with router
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe("CapitalsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading spinner when loading", () => {
    useAllCapitals.mockReturnValue({ capitals: [], loading: true });

    renderWithRouter(<CapitalsPage />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders all capitals when loaded", () => {
    useAllCapitals.mockReturnValue({
      capitals: ["Paris", "London", "Berlin"],
      loading: false,
    });

    renderWithRouter(<CapitalsPage />);

    expect(screen.getByText("Paris")).toBeInTheDocument();
    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });

  it("filters capitals based on search input", () => {
    useAllCapitals.mockReturnValue({
      capitals: ["Paris", "London", "Berlin"],
      loading: false,
    });

    renderWithRouter(<CapitalsPage />);

    fireEvent.change(screen.getByPlaceholderText(/search for a capital/i), {
      target: { value: "lon" },
    });

    expect(screen.getByText("London")).toBeInTheDocument();
    expect(screen.queryByText("Paris")).not.toBeInTheDocument();
    expect(screen.queryByText("Berlin")).not.toBeInTheDocument();
  });

  it('displays "No capitals found." when search yields no results', () => {
    useAllCapitals.mockReturnValue({
      capitals: ["Paris", "London", "Berlin"],
      loading: false,
    });

    renderWithRouter(<CapitalsPage />);

    fireEvent.change(screen.getByPlaceholderText(/search for a capital/i), {
      target: { value: "zzz" },
    });

    expect(screen.getByText(/no capitals found/i)).toBeInTheDocument();
  });
});
