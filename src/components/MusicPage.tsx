
const spotifyTracks = [
  {
    title: "Spotify Track Example",
    url: "https://open.spotify.com/track/4oVO4fGNRRvEn0CRuFO4qv?si=76ae92f80bc24d2f",
    embed: "https://open.spotify.com/embed/track/4oVO4fGNRRvEn0CRuFO4qv?utm_source=generator"
  },
  // Add more tracks here as needed
];

const MusicPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-slate-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-green-300 drop-shadow-lg mb-8 border-b-4 border-green-500 pb-2 w-full text-center shadow-green-500/40 shadow">
        Music
      </h1>
      <div className="w-full max-w-xl flex flex-col gap-8 items-center">
        {spotifyTracks.map((track, idx) => (
          <div
            key={track.url}
            className="w-full bg-green-950/80 border-4 border-green-500 rounded-xl shadow-lg shadow-green-700/40 p-4 flex flex-col items-center hover:shadow-green-400/60 transition-all duration-300"
            style={{ boxShadow: "0 0 32px #22c55e, 0 0 8px #166534 inset" }}
          >
            <iframe
              src={track.embed}
              width="100%"
              height="80"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              loading="lazy"
              className="rounded-lg border-2 border-green-400 shadow-green-400/30 shadow"
              title={track.title}
            />
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-green-200 font-semibold underline hover:text-green-400 transition"
            >
              Listen on Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicPage;
