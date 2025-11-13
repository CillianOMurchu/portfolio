import React from "react";

interface LoadingScreenProps {
  authLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ authLoading }) => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="text-center">
        <div className="text-gray-600 font-medium">
          {authLoading ? "Signing you in..." : "..."}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;