import React, { useState, useMemo } from 'react';
import { Star, MapPin, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { ShopResult } from '../types';

interface ResultsTableProps {
  results: ShopResult[];
  isLoading: boolean;
  error: string | null;
  className?: string;
}

type SortField = 'name' | 'rating';
type SortDirection = 'asc' | 'desc' | null;

export const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  isLoading,
  error,
  className = ""
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Sort the results
  const sortedResults = useMemo(() => {
    if (!sortDirection) return results;
    
    return [...results].sort((a, b) => {
      let aValue: string | number = a[sortField] as string | number;
      let bValue: string | number = b[sortField] as string | number;
      
      if (sortField === 'rating') {
        aValue = a.rating || 0;
        bValue = b.rating || 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [results, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => 
        prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'
      );
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllSelection = () => {
    if (selectedRows.size === results.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(results.map(r => r.id)));
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4 text-blue-300" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4 text-blue-300" />;
    return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
  };

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-center py-16 bg-blue-50 rounded-lg border border-blue-200">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-blue-700 font-medium">Loading results...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-blue-500 mr-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-800">Search Error</h4>
              <p className="text-sm text-blue-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="text-center py-16 bg-blue-50 rounded-lg border border-blue-200">
          <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-blue-600 mb-2">No results found</h4>
          <p className="text-blue-500">Try searching for a different type of business or area.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Compact Results Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-t-lg">
        <h3 className="font-medium">Results ({results.length})</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedRows(new Set())}
            className="text-xs bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded transition-colors"
          >
            Clear Selection
          </button>
        </div>
      </div>

      {/* Angular Material Style Table */}
      <div className="bg-white rounded-b-lg shadow-lg overflow-hidden border border-blue-200" style={{ maxHeight: 'calc(100vh - 300px)' }}>
        <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
          <table className="w-full text-sm">
            {/* Sticky Header */}
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                <th className="w-8 px-2 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === results.length && results.length > 0}
                    onChange={toggleAllSelection}
                    className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th 
                  className="px-3 py-3 text-left font-medium cursor-pointer hover:bg-blue-600 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Business</span>
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="w-20 px-2 py-3 text-center font-medium cursor-pointer hover:bg-blue-600 transition-colors"
                  onClick={() => handleSort('rating')}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>Rating</span>
                    {getSortIcon('rating')}
                  </div>
                </th>
                <th className="w-32 px-2 py-3 text-center font-medium">
                  <span>Email</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((result, index) => (
                <tr 
                  key={result.id}
                  className={`border-b border-blue-100 hover:bg-blue-600 hover:text-white cursor-pointer transition-all duration-200 group ${
                    index % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'
                  } ${selectedRows.has(result.id) ? 'bg-blue-200' : ''}`}
                  onClick={() => toggleRowSelection(result.id)}
                >
                  <td className="px-2 py-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(result.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRowSelection(result.id);
                      }}
                      className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 group-hover:text-white text-sm">
                        {result.name}
                      </div>
                      <div className="flex items-start space-x-1 text-xs text-gray-600 group-hover:text-red-100">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{result.address}</span>
                      </div>
                      {result.priceLevel && (
                        <div className="text-xs">
                          <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">
                            {'€'.repeat(result.priceLevel)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-center">
                    {result.rating ? (
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900 group-hover:text-white text-xs">
                            {result.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 group-hover:text-blue-100">
                          {result.rating >= 4.5 ? 'Excellent' : 
                           result.rating >= 4.0 ? 'Very Good' :
                           result.rating >= 3.5 ? 'Good' :
                           result.rating >= 3.0 ? 'Average' : 'Poor'}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-xs text-gray-500 group-hover:text-blue-100">No rating</div>
                      </div>
                    )}
                  </td>
                  <td className="px-2 py-2 text-center">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 group-hover:text-blue-100">Not available</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer */}
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-2 flex items-center justify-between text-sm text-blue-700">
          <div>
            {selectedRows.size > 0 && (
              <span className="font-medium">{selectedRows.size} selected</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {results.length >= 20 && (
              <span className="text-xs">Showing first 20 results</span>
            )}
            <span>{results.length} total results</span>
          </div>
        </div>
      </div>
    </div>
  );
};