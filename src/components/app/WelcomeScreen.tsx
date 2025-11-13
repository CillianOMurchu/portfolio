import React from "react";
import ItemSphere from "../ItemSphere";

const WelcomeScreen: React.FC = () => {
  return (
    <>
      <div className="smoke w-100 h-100 absolute top-[90px] right-[10px] -z-10 background-gradient-animation opacity-70 ">
        <ItemSphere iconSize={20} />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 mb-6 font-medium">
            ✨ Signed in with Google
          </p>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
