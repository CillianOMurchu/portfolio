import React from 'react'
import { ShimmerEffect } from '../ShimmerEffect'

export const ShimmerDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Shimmer Effect Demo</h1>
        
        {/* Different Intensities */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl mb-4">Intensity Variations</h2>
            <div className="space-y-4">
              <ShimmerEffect intensity="low" speed="normal">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Low Intensity</h3>
                  <p className="text-gray-600">Subtle shimmer effect</p>
                </div>
              </ShimmerEffect>
              
              <ShimmerEffect intensity="medium" speed="normal">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">Medium Intensity</h3>
                  <p className="text-gray-600">Balanced shimmer effect</p>
                </div>
              </ShimmerEffect>
              
              <ShimmerEffect intensity="high" speed="normal">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">High Intensity</h3>
                  <p className="text-gray-600">Bright shimmer effect</p>
                </div>
              </ShimmerEffect>
            </div>
          </div>
          
          {/* Different Speeds */}
          <div>
            <h2 className="text-xl mb-4">Speed Variations</h2>
            <div className="space-y-4">
              <ShimmerEffect intensity="medium" speed="slow">
                <div className="bg-blue-600 text-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Slow Speed (3s)</h3>
                  <p>Relaxed shimmer animation</p>
                </div>
              </ShimmerEffect>
              
              <ShimmerEffect intensity="medium" speed="normal">
                <div className="bg-green-600 text-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Normal Speed (2s)</h3>
                  <p>Standard shimmer animation</p>
                </div>
              </ShimmerEffect>
              
              <ShimmerEffect intensity="medium" speed="fast">
                <div className="bg-red-600 text-white p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">Fast Speed (1s)</h3>
                  <p>Quick shimmer animation</p>
                </div>
              </ShimmerEffect>
            </div>
          </div>
          
          {/* Text Examples */}
          <div>
            <h2 className="text-xl mb-4">Text Examples</h2>
            <div className="space-y-4">
              <ShimmerEffect intensity="high" speed="slow" className="text-center">
                <h1 className="text-4xl font-bold text-gray-900">
                  Welcome to Creative Portfolio
                </h1>
              </ShimmerEffect>
              
              <ShimmerEffect intensity="medium" speed="normal" className="text-center">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Interactive Visual Experience
                </h2>
              </ShimmerEffect>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShimmerDemo