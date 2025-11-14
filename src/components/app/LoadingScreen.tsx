import React from "react";

interface LoadingScreenProps {
  authLoading: boolean;
}

const LightningBar: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) {
    return (
      <div className="relative w-64 h-3 bg-gray-900 rounded-full overflow-hidden shadow-inner border border-emerald-500/30">
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #10b981 0%, #34d399 30%, #6ee7b7 60%, #10b981 100%)",
            backgroundSize: "200% 100%",
            boxShadow: "0 0 15px #10b981, 0 0 30px #10b981, 0 0 45px #10b981, inset 0 0 10px rgba(16, 185, 129, 0.3)",
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full rounded-full opacity-50"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-64 h-3 bg-gray-900 rounded-full overflow-hidden shadow-inner border border-emerald-500/30">
      <div
        className="absolute top-0 left-0 h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #10b981 0%, #34d399 30%, #6ee7b7 60%, #10b981 100%)",
          backgroundSize: "200% 100%",
          boxShadow: "0 0 15px #10b981, 0 0 30px #10b981, 0 0 45px #10b981, inset 0 0 10px rgba(16, 185, 129, 0.3)",
          animation: "lightning 2s ease-in-out infinite, glow 1.5s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ authLoading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600 font-medium mb-4">
          <LightningBar isLoading={authLoading} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
