import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom"; // Add useNavigate import
import Header from "../Header";
import { useAuth } from "../../context/AuthContext";
import React from "react";
// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

// Mock AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("Header component", () => {
  let mockLogout;
  let mockNavigate;

  beforeEach(() => {
    mockLogout = vi.fn();
    mockNavigate = vi.fn();

    // Mock useNavigate
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    useAuth.mockReturnValue({
      user: { name: "Test User" },
      logout: mockLogout,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the header and links correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Country Explorer/)).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/)).toBeInTheDocument();
  });

  it('calls navigate(-1) when "Go Back" button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const goBackButton = screen.getByRole("button", { name: /Go Back/ });
    fireEvent.click(goBackButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
