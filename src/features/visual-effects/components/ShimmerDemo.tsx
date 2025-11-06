import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerEffect } from "../ShimmerEffect";

export const ShimmerDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-colors text-sm"
      >
        {isOpen ? "Hide Demo" : "Show Demo"}
      </button>

      {/* Collapsible Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-12 right-0 bg-white rounded-lg shadow-xl p-4 w-64 border"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Shimmer Examples
            </h3>
            
            <div className="space-y-3">
              {/* Text Example */}
              <ShimmerEffect>
                <div className="text-center py-2">
                  <h4 className="text-sm font-medium text-gray-800">Welcome</h4>
                </div>
              </ShimmerEffect>

              {/* Button Example */}
              <ShimmerEffect>
                <button className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                  Action Button
                </button>
              </ShimmerEffect>

              {/* Card Example */}
              <ShimmerEffect>
                <div className="bg-gray-50 p-3 rounded border">
                  <div className="text-xs font-medium text-gray-800">Card Title</div>
                  <div className="text-xs text-gray-600 mt-1">Sample content</div>
                </div>
              </ShimmerEffect>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShimmerDemo;
