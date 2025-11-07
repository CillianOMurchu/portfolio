import { useState, useCallback } from 'react';
import { useGoogleMaps } from './useGoogleMaps';
import { getAreaById } from '../utils/barcelonaAreas';
import type { ShopResult, SearchState } from '../types';

export const useShopSearch = () => {
  const { isLoaded, placesService, error: mapsError } = useGoogleMaps();
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    results: [],
    error: null,
    hasSearched: false
  });

  const searchShops = useCallback(async (shopType: string, areaId: string) => {
    if (!isLoaded || !placesService) {
      setSearchState(prev => ({
        ...prev,
        error: mapsError || 'Google Maps not loaded yet',
        hasSearched: true
      }));
      return;
    }

    if (!shopType.trim() || !areaId) {
      setSearchState(prev => ({
        ...prev,
        error: 'Please enter a shop type and select an area',
        hasSearched: true
      }));
      return;
    }

    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      hasSearched: true
    }));

    try {
      const area = getAreaById(areaId);
      if (!area) {
        throw new Error('Selected area not found');
      }

      // Construct search query
      const query = `${shopType} in ${area.name}, Barcelona, Spain`;

      // Create search request
      const request = {
        query,
        location: new (window as any).google.maps.LatLng(area.coordinates.lat, area.coordinates.lng),
        radius: 2000, // 2km radius
        type: 'establishment'
      };

      // Perform text search
      placesService.textSearch(request, (results: any[], status: any) => {
        if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && results) {
          // Process and format results
          const formattedResults: ShopResult[] = results
            .filter(place => place.geometry && place.geometry.location)
            .slice(0, 20) // Limit to 20 results
            .map((place, index) => ({
              id: place.place_id || `result-${index}`,
              name: place.name || 'Unknown',
              address: place.formatted_address || 'Address not available',
              rating: place.rating,
              status: place.business_status === 'OPERATIONAL' ? 'OPERATIONAL' : 
                     place.business_status === 'CLOSED_PERMANENTLY' ? 'CLOSED' : 'UNKNOWN',
              location: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              photos: place.photos ? place.photos.slice(0, 3).map((photo: any) => 
                photo.getUrl({ maxWidth: 400, maxHeight: 400 })
              ) : [],
              priceLevel: place.price_level,
            }));

          // Sort by rating only
          const sortedResults = formattedResults.sort((a, b) => {
            if (a.rating && b.rating) {
              return b.rating - a.rating;
            }
            return 0;
          });

          setSearchState({
            isLoading: false,
            results: sortedResults,
            error: null,
            hasSearched: true
          });
        } else {
          let errorMessage = 'No results found';
          
          if (status === (window as any).google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            errorMessage = `No ${shopType} found in ${area.name}`;
          } else if (status === (window as any).google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
            errorMessage = 'Search quota exceeded. Please try again later.';
          } else if (status === (window as any).google.maps.places.PlacesServiceStatus.REQUEST_DENIED) {
            errorMessage = 'Search request denied. Please check API key configuration.';
          }

          setSearchState({
            isLoading: false,
            results: [],
            error: errorMessage,
            hasSearched: true
          });
        }
      });
    } catch (error) {
      console.error('Search error:', error);
      setSearchState({
        isLoading: false,
        results: [],
        error: error instanceof Error ? error.message : 'Search failed',
        hasSearched: true
      });
    }
  }, [isLoaded, placesService, mapsError]);

  const clearResults = useCallback(() => {
    setSearchState({
      isLoading: false,
      results: [],
      error: null,
      hasSearched: false
    });
  }, []);

  return {
    ...searchState,
    searchShops,
    clearResults,
    isGoogleMapsReady: isLoaded && !mapsError
  };
};