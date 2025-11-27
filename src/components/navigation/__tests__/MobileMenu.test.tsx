import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MobileMenu } from "../MobileMenu";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("MobileMenu", () => {
  it("opens with burger, closes with burger or overlay", () => {
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );
    const burger = screen.getByRole("button", { name: /menu|close/i });
    // Initially closed
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
    // Open menu
    fireEvent.click(burger);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    // Close menu with burger
    fireEvent.click(burger);
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
    // Open again
    fireEvent.click(burger);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    // Close menu with overlay
    const overlay = screen.getByTestId("mobile-menu-overlay");
    fireEvent.click(overlay);
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
  });
});
