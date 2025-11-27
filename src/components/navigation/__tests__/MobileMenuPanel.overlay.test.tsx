import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MobileMenuPanel } from "../MobileMenuPanel";
import { MemoryRouter } from "react-router-dom";

describe("MobileMenuPanel", () => {
  test("panel closes when clicking outside (overlay)", async () => {
    function Wrapper() {
      const [open, setOpen] = React.useState(true);
      return (
        <MemoryRouter>
          <MobileMenuPanel isOpen={open} onClose={() => setOpen(false)} />
          <button data-testid="dummy">Dummy</button>
        </MemoryRouter>
      );
    }
    render(<Wrapper />);

    // Panel should be visible
    await waitFor(() => {
      expect(document.querySelector(".menu-panel")).toBeInTheDocument();
    });

    // Click overlay (outside panel)
    const overlay = screen.getByTestId("overlay");
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay);

    // Panel should be gone
    await waitFor(() => {
      expect(document.querySelector(".menu-panel")).toBeNull();
    });
  });

  test("panel does NOT close when clicking inside panel", async () => {
    function Wrapper() {
      const [open, setOpen] = React.useState(true);
      return (
        <MemoryRouter>
          <MobileMenuPanel isOpen={open} onClose={() => setOpen(false)} />
        </MemoryRouter>
      );
    }
    render(<Wrapper />);

    // Panel should be visible
    await waitFor(() => {
      expect(document.querySelector(".menu-panel")).toBeInTheDocument();
    });

    // Click inside panel
    const panel = document.querySelector(".menu-panel");
    expect(panel).toBeInTheDocument();
    fireEvent.click(panel!);

    // Panel should still be visible
    await waitFor(() => {
      expect(document.querySelector(".menu-panel")).toBeInTheDocument();
    });
  });
});
