import React from "react";

interface LoadingScreenProps {
  authLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ authLoading }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600 font-medium">
          {authLoading ? "Signing you in..." : "..."}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;