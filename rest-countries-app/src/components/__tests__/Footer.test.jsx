import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../Footer";
import React from "react";
describe("Footer Component", () => {
  it("renders copyright information with current year", () => {
    const currentYear = new Date().getFullYear();
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        `© ${currentYear} Country Explorer App. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  it("renders all footer links", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("links have correct href attributes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const termsLink = screen.getByText("Terms of Service");
    const privacyLink = screen.getByText("Privacy Policy");
    const contactLink = screen.getByText("Contact Us");

    expect(termsLink.closest("a")).toHaveAttribute("href", "/");
    expect(privacyLink.closest("a")).toHaveAttribute("href", "/");
    expect(contactLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("has proper styling classes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-dark");
    expect(footer).toHaveClass("text-white");
    expect(footer).toHaveClass("py-3");
    expect(footer).toHaveClass("mt-5");
  });
});
