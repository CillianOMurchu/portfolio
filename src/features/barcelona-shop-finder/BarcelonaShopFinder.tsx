import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { ShopFinderModal } from './components/ShopFinderModal';
import { ShopTypeInput } from './components/ShopTypeInput';
import { AreaDropdown } from './components/AreaDropdown';
import { ResultsTable } from './components/ResultsTable';
import { useShopSearch } from './hooks/useShopSearch';
import type { ShopFinderProps } from './types';

const BarcelonaShopFinder: React.FC<ShopFinderProps> = ({
  buttonText = "Find Barcelona Shops",
  className = "",
  onSearchComplete
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopType, setShopType] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  
  const { 
    results, 
    isLoading, 
    error, 
    hasSearched,
    searchShops, 
    clearResults,
    isGoogleMapsReady 
  } = useShopSearch();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    clearResults();
    setShopType('');
    setSelectedArea('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearResults();
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopType.trim() || !selectedArea) {
      return;
    }

    await searchShops(shopType, selectedArea);
    
    if (onSearchComplete && results.length > 0) {
      onSearchComplete(results);
    }
  };

  const isSearchDisabled = !isGoogleMapsReady || !shopType.trim() || !selectedArea;

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpenModal}
        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${className}`}
      >
        <MapPin className="w-5 h-5 mr-2" />
        {buttonText}
      </button>

      {/* Modal - COMPACT FULL SCREEN EXPERIENCE! 🎬 */}
      <ShopFinderModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="min-h-screen p-4 space-y-4">
          {/* Google Maps Status - Compact! */}
          {!isGoogleMapsReady && !error && (
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 border border-white rounded-lg p-3 shadow-lg text-center">
              <div className="flex items-center justify-center space-x-3 text-white">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <div className="text-sm font-bold">🗺️ Loading Google Maps...</div>
              </div>
            </div>
          )}

          {/* Search Form - Compact control center! 🎛️ */}
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSearch} className="space-y-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-purple-200">
              <div className="grid gap-4 lg:grid-cols-2">
                <ShopTypeInput
                  value={shopType}
                  onChange={setShopType}
                />
                
                <AreaDropdown
                  value={selectedArea}
                  onChange={setSelectedArea}
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSearchDisabled || isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Results - Compact! 🎊 */}
          {(hasSearched || isLoading) && (
            <div className="max-w-7xl mx-auto">
              <ResultsTable
                results={results}
                isLoading={isLoading}
                error={error}
              />
            </div>
          )}
        </div>
      </ShopFinderModal>
    </>
  );
};

export default BarcelonaShopFinder;