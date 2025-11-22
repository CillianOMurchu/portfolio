import { render, waitFor } from "@testing-library/react";
import MusicPage from "../MusicPage";
import { vi, describe, it, beforeEach, expect } from "vitest";

// Mock fetch for Supabase Edge Function and Spotify API
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("MusicPage", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    localStorage.clear();
  });

  it("calls Supabase Edge Function and Spotify API to fetch liked songs", async () => {
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
        json: () => Promise.resolve({ items: [{ track: { id: "1", name: "Song" } }] }),
      })
    );

    render(<MusicPage />);

    await waitFor(() => {
      // First call: Supabase Edge Function
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("spotify-token-exchange"),
        expect.objectContaining({ method: "POST" })
      );
      // Second call: Spotify API
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.spotify.com/v1/me/tracks?limit=50",
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: "Bearer test-token" }),
        })
      );
    });
  });
});
