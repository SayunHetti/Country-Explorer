import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

// A component that throws an error to test the ErrorBoundary
const ErrorComponent = () => {
  throw new Error("Test error");
  return null;
};

describe("ErrorBoundary Component", () => {
  beforeAll(() => {
    // Suppress console error logs for expected error throwing
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child-component">Normal content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child-component")).toBeInTheDocument();
    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("displays error UI when child component throws", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("😿 Oops! Something went wrong.")
    ).toBeInTheDocument();

    const errorImage = screen.getByAltText("Error cat");
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute(
      "src",
      "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
    );
    expect(errorImage).toHaveStyle({
      maxWidth: "300px",
      marginTop: "20px",
    });
  });

  it("contains a working link to home page", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    const homeLink = screen.getByText("logging in again");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });
});
