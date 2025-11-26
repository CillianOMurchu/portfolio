import React from "react";

const AboutScreen: React.FC = () => {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6">About</h1>
                <p className="text-lg mb-4">
                    Welcome to the creative developer portfolio! This site showcases interactive experiences across gaming analytics, sports tracking, workout planners, code demos, and music visualizations.
                </p>
                <p className="text-md text-gray-300">
                    Explore features powered by React, TypeScript, Three.js, Framer Motion, and Supabase. Each section demonstrates technical skills through engaging, imaginative interfaces.
                </p>
            </div>
        </section>
    );
};

export default AboutScreen;