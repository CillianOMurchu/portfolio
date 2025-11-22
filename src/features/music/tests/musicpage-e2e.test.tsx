import { render, screen, waitFor } from "@testing-library/react";
import MusicPage from "../components/MusicPage";
import { vi } from "vitest";

// Mock fetch for Supabase Edge Function and Spotify API
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("MusicPage E2E", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    localStorage.clear();
  });

  it("renders the list of liked songs after fetching", async () => {
    // Step 1: Supabase Edge Function returns access token
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ access_token: "test-token" }),
      })
    );
    // Step 2: Spotify API returns liked songs
    mockFetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ items: [
          { track: { id: "1", name: "Song One", album: { images: [{ url: "img1" }] }, artists: [{ name: "Artist One" }], external_urls: { spotify: "url1" } } },
          { track: { id: "2", name: "Song Two", album: { images: [{ url: "img2" }] }, artists: [{ name: "Artist Two" }], external_urls: { spotify: "url2" } } }
        ] }),
      })
    );

    render(<MusicPage />);

    await waitFor(() => {
      expect(screen.getByText("Song One")).toBeInTheDocument();
      expect(screen.getByText("Song Two")).toBeInTheDocument();
    });
  });
});
