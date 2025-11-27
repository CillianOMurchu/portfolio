import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { MobileMenuPanel } from "../MobileMenuPanel";
import { MemoryRouter } from "react-router-dom";

describe("MobileMenuPanel", () => {
  test("shows and hides menu panel when burger menu is clicked", () => {
    // Simulate parent state
    function Wrapper() {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <button data-testid="burger" onClick={() => setOpen((v) => !v)}>
            Burger
          </button>
          <MobileMenuPanel isOpen={open} onClose={() => setOpen(false)} />
        </>
      );
    }

    render(
      <MemoryRouter>
        <Wrapper />
      </MemoryRouter>
    );

      await waitFor(() => {
        expect(document.querySelector(".menu-panel")).toBeNull();
      });

    // Click burger to open
    fireEvent.click(screen.getByTestId("burger"));
      await waitFor(() => {
        expect(document.querySelector(".menu-panel")).toBeInTheDocument();
      });

    // Click burger again to close
    fireEvent.click(screen.getByTestId("burger"));
      await waitFor(() => {
        expect(document.querySelector(".menu-panel")).toBeNull();
      });
  });
});
