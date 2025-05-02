import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import React from "react";
// Mock AuthContext
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));
import { useAuth } from "../../context/AuthContext";

describe("PrivateRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const ProtectedComponent = () => <div>Protected Content</div>;
  const PublicComponent = () => <div>Public Page</div>;

  const renderWithRoutes = () =>
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute>
                <ProtectedComponent />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<PublicComponent />} />
        </Routes>
      </MemoryRouter>
    );

  it("renders loading message when auth is loading", () => {
    useAuth.mockReturnValue({ user: null, isLoading: true });

    renderWithRoutes();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects to home if user is not authenticated", () => {
    useAuth.mockReturnValue({ user: null, isLoading: false });

    renderWithRoutes();
    expect(screen.getByText("Public Page")).toBeInTheDocument();
  });

  it("renders protected content when user is authenticated", () => {
    useAuth.mockReturnValue({ user: { name: "Jane" }, isLoading: false });

    renderWithRoutes();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
