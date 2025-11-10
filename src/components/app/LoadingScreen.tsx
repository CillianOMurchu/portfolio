import React from "react";

interface LoadingScreenProps {
  authLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ authLoading }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg animate-pulse">
          <span className="text-2xl font-bold text-white">C</span>
        </div>
        <div className="text-gray-600 font-medium">
          {authLoading ? "Signing you in..." : "Loading portfolio..."}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;