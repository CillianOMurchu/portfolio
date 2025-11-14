import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ShopFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const ShopFinderModal: React.FC<ShopFinderModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content - FULL SCREEN BEAST MODE! 🚀 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.75, 0.5, 1.25] }}
            className="relative w-full h-full bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 50%, #f5f3ff 100%)',
              minHeight: '100vh'
            }}
          >
            {/* Close Button - Now with more pizzazz! ✨ */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-red-50 dark:bg-gray-800/90 dark:hover:bg-red-900/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 group"
              aria-label="Close modal (or escape this madness!)"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-red-500 transition-colors" />
            </button>

            {/* Modal Body - Let it grow like a beautiful flower! 🌸 */}
            <div className="h-full min-h-screen overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};