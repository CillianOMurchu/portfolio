import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicSkillsSphere } from '../features/HolographicSkillsSphere';
import { ItemSphere } from '../features/ItemSphere';

interface SphereShowcaseProps {
  onBack?: () => void;
}

const SphereShowcase: React.FC<SphereShowcaseProps> = ({ onBack }) => {
  const [selectedSphere, setSelectedSphere] = useState<string | null>(null);

  const sphereExamples = [
    {
      id: 'skills',
      name: 'Skills Sphere',
      description: 'Interactive 3D sphere displaying programming technologies and skills',
      component: <HolographicSkillsSphere />,
      features: ['28 Programming Icons', 'SVG Loading', 'Hover Effects', 'Click Interactions']
    },
    {
      id: 'minimal',
      name: 'Minimal Item Sphere',
      description: 'Bare minimum rotating sphere with programming icons (no extra logic)',
      component: <ItemSphere width={200} height={200} radius={80} iconSize={32} />, // slightly larger for demo
      features: ['Minimal Logic', 'Direct Icon List', 'No Hover/Click', 'Fast Load']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {onBack && (
            <button
              onClick={onBack}
              className="absolute top-6 left-6 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          )}
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Skills Sphere Showcase</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive 3D sphere displaying programming technologies and skills with SVG icons.
          </p>
        </div>

        {/* Sphere Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {sphereExamples.map((sphere) => (
            <motion.div
              key={sphere.id}
              layout
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{sphere.name}</h3>
                    <p className="text-gray-600 mb-4">{sphere.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSphere(selectedSphere === sphere.id ? null : sphere.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {selectedSphere === sphere.id ? 'Hide' : 'View'}
                  </button>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sphere.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sphere Component */}
                <AnimatePresence>
                  {selectedSphere === sphere.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t pt-6 mt-6"
                    >
                      <div className="flex justify-center">
                        <div className="w-full max-w-md">
                          {sphere.component}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Information */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills Sphere Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Auto Icon Detection</h3>
              <p className="text-gray-600 text-sm">Automatically loads all SVG icons from assets folder</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Interactive 3D</h3>
              <p className="text-gray-600 text-sm">Hover effects and click interactions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Technology Icons</h3>
              <p className="text-gray-600 text-sm">Programming languages, frameworks, and tools</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Responsive</h3>
              <p className="text-gray-600 text-sm">Works across all device sizes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SphereShowcase;