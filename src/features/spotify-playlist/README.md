# Spotify Playlist Page

This feature provides a green-themed, glowing, bordered, and shadowed interface for displaying all songs from a Spotify playlist using the Spotify Web API.

## Usage
- Add your Spotify app `CLIENT_ID` in the code.
- Replace `YOUR_PLAYLIST_ID` with the ID from your playlist URL.
- The page will prompt for Spotify login and then display all tracks in the playlist with cover art, song name, artist, and a link to listen on Spotify.

## OAuth Flow
- Uses implicit grant flow (no backend required).
- Stores the access token in localStorage for session persistence.

## Styling
- Tailwind CSS for layout, borders, glow, and shadows.
- Responsive and mobile-friendly.

## File Structure
```
src/features/spotify-playlist/
├── SpotifyPlaylistPage.tsx
└── README.md
```

## Example Playlist Link
- Format: `https://open.spotify.com/playlist/{playlist_id}`
- Example ID: `37i9dQZF1DXcBWIGoYBM5M`

## To Add
- Error handling for invalid tokens or empty playlists
- Support for paginated playlists (more than 100 tracks)
