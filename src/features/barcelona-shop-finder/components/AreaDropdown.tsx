import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { BARCELONA_AREAS, searchAreas } from '../utils/barcelonaAreas';
import type { BarcelonaArea } from '../types';

interface AreaDropdownProps {
  value: string;
  onChange: (areaId: string) => void;
  className?: string;
}

export const AreaDropdown: React.FC<AreaDropdownProps> = ({
  value,
  onChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAreas, setFilteredAreas] = useState<BarcelonaArea[]>(BARCELONA_AREAS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedArea = BARCELONA_AREAS.find(area => area.id === value);

  // Filter areas based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredAreas(searchAreas(searchTerm));
    } else {
      setFilteredAreas(BARCELONA_AREAS);
    }
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (area: BarcelonaArea) => {
    onChange(area.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const groupedAreas = filteredAreas.reduce((acc, area) => {
    const district = area.district;
    if (!acc[district]) {
      acc[district] = [];
    }
    acc[district].push(area);
    return acc;
  }, {} as Record<string, BarcelonaArea[]>);

  return (
    <div className={`relative space-y-1 ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Barcelona Area *
      </label>
      
      {/* Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                 bg-white dark:bg-gray-800 text-left
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 transition-colors duration-200 flex items-center justify-between"
      >
        <span className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {selectedArea ? (
            <span className="text-gray-900 dark:text-gray-100 truncate">
              {selectedArea.name}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">
              Select area
            </span>
          )}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu - COMPACT SCROLLABLE BEAST! 🌈 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-lg shadow-2xl border-2 border-white max-h-80 overflow-hidden"
             style={{
               background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 40%, #f97316 100%)',
               boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)'
             }}>
          {/* Search Input - Compact! */}
          <div className="p-2 border-b border-white/30 bg-white/10 backdrop-blur-sm">
            <input
              type="text"
              placeholder="🔍 Search areas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-white/50 rounded-md bg-white/90 text-gray-900 placeholder-purple-500 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 text-sm font-medium shadow-inner"
              autoFocus
            />
          </div>

          {/* Areas List - MAXIMUM DENSITY! 🎪 */}
          <div className="overflow-y-auto max-h-72 scrollbar-thin scrollbar-thumb-white/50 scrollbar-track-transparent">
            {Object.keys(groupedAreas).length === 0 ? (
              <div className="p-4 text-center text-white">
                <div className="text-lg">🤷‍♂️ No areas found!</div>
              </div>
            ) : (
              Object.entries(groupedAreas).map(([district, areas]) => (
                <div key={district}>
                  {areas.map((area, index) => (
                    <button
                      key={area.id}
                      onClick={() => handleSelect(area)}
                      className="w-full px-4 py-2 text-left hover:bg-white/20 focus:bg-white/30 transition-all duration-150 border-b border-white/10 last:border-b-0 group text-sm"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${0.03 + (index % 3) * 0.03}) 100%)`
                      }}
                    >
                      <div className="flex items-center text-white group-hover:text-yellow-200 transition-colors">
                        <span className="text-sm mr-2">📍</span>
                        <div className="truncate">
                          <div className="font-medium">
                            {area.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};