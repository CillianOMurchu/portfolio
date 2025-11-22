import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import MusicPage from "../../../components/MusicPage";

// Mock fetch globally
beforeAll(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ items: [] }),
    })
  );
});

afterAll(() => {
  // @ts-ignore
  global.fetch.mockRestore && global.fetch.mockRestore();
});

describe("MusicPage", () => {
  it("calls the Spotify liked songs endpoint on init", async () => {
    // Set a fake token in localStorage
    localStorage.setItem("spotify_token", "FAKE_TOKEN");

    render(<MusicPage />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/me/tracks?limit=50",
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: "Bearer FAKE_TOKEN",
          }),
        })
      );
    });
  });
});
