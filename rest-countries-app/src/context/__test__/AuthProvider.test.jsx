import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext"; // Adjust the import paths
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { vi } from "vitest";
import React from "react";

// Mock Firebase Auth functions
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({})), // Mock GoogleAuthProvider
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
}));

describe("AuthProvider", () => {
  it("renders the loading spinner when isLoading is true", () => {
    const mockAuth = { currentUser: null };
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    // Mock onAuthStateChanged to simulate loading state
    vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      callback(null); // No user
      return () => {};
    });

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    // Check for loading spinner
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
  });

  it("renders children after loading", async () => {
    const mockAuth = { currentUser: { uid: "123" } };
    vi.mocked(getAuth).mockReturnValue(mockAuth);

    // Mock onAuthStateChanged to simulate authenticated user
    vi.mocked(onAuthStateChanged).mockImplementation((auth, callback) => {
      callback({ uid: "123" }); // User is authenticated
      return () => {};
    });

    render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    );

    // Wait for loading to finish and ensure spinner is gone
    await waitFor(
      () => {
        // Wait for the spinner to disappear, considering the 1-second delay
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    ); // Allow up to 3 seconds for loading state change

    // Ensure children are rendered
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
