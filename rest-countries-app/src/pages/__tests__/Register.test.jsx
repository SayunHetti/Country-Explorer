import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Register from "../Register";
import toast from "react-hot-toast";
import React from "react";
// Mock Firebase auth function
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: vi.fn(),
  GoogleAuthProvider: vi.fn().mockImplementation(() => ({})),
  getAuth: vi.fn().mockReturnValue({}),
}));

// Mock useNavigate from react-router
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

// Properly mock toast functions (success & error)
vi.mock("react-hot-toast", () => {
  const toastMock = {
    success: vi.fn(),
    error: vi.fn(),
  };
  return {
    __esModule: true,
    default: toastMock,
  };
});

describe("Register Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renders input fields and button", () => {
    render(<Register />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("shows error if fields are empty", () => {
    render(<Register />);
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(toast.error).toHaveBeenCalledWith("Please fill in all fields.");
  });

  it("shows error for short password", () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(toast.error).toHaveBeenCalledWith(
      "Password must be at least 6 characters long."
    );
  });

  it("calls createUserWithEmailAndPassword on valid input", async () => {
    createUserWithEmailAndPassword.mockResolvedValue({});
    render(<Register />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth object
      "user@example.com",
      "password123"
    );
  });
});
