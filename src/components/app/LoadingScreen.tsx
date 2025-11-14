import React from "react";

interface LoadingScreenProps {
  authLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ authLoading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600 font-medium mb-4">
          {authLoading ? (
            <div className="relative w-64 h-1 bg-gray-200 rounded overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded animate-lightning"
                style={{
                  animation: "lightning 1.5s ease-in-out infinite",
                }}
              />
            </div>
          ) : (
            <div className="relative w-64 h-1 bg-gray-200 rounded overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 rounded animate-lightning"
                style={{
                  animation: "lightning 1.5s ease-in-out infinite",
                }}
              />
            </div>
          )}
        </div>
        {!authLoading && (
          <div className="relative w-64 h-1 bg-gray-200 rounded overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-blue-500 rounded animate-lightning"
              style={{
                animation: "lightning 1.5s ease-in-out infinite",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
