export function SpotifyLoginButton() {
  const isAuthenticated = !!localStorage.getItem("spotify_access_token");

  const login = () => {
    const params = new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri: import.meta.env.VITE_SPOTIFY_CLIENT_REDIRECT_URI,
      scope: "user-read-private user-read-email user-library-read",
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  return (
    <button
      onClick={login}
      className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
    >
      {isAuthenticated ? "Reconnect Spotify Account" : "Login with Spotify"}
    </button>
  );
}