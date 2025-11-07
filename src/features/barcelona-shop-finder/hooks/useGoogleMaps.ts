import { useState, useEffect } from 'react';

interface GoogleMapsState {
  isLoaded: boolean;
  placesService: unknown | null;
  error: string | null;
}

export const useGoogleMaps = () => {
  const [state, setState] = useState<GoogleMapsState>({
    isLoaded: false,
    placesService: null,
    error: null
  });

  useEffect(() => {
    const initializeGoogleMaps = () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      
      if (!apiKey) {
        setState({
          isLoaded: false,
          placesService: null,
          error: 'Google Maps API key not found in environment variables'
        });
        return;
      }

      // Load Google Maps script directly
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        try {
          // Create a dummy div for the PlacesService
          const dummyDiv = document.createElement('div');
          const placesService = new (window as any).google.maps.places.PlacesService(dummyDiv);

          setState({
            isLoaded: true,
            placesService,
            error: null
          });
        } catch (error) {
          console.error('Error initializing Places Service:', error);
          setState({
            isLoaded: false,
            placesService: null,
            error: 'Failed to initialize Google Places service'
          });
        }
      };

      script.onerror = () => {
        setState({
          isLoaded: false,
          placesService: null,
          error: 'Failed to load Google Maps API'
        });
      };

      // Only add script if not already added
      if (!document.querySelector(`script[src*="maps.googleapis.com"]`)) {
        document.head.appendChild(script);
      } else if ((window as any).google) {
        // Already loaded
        try {
          const dummyDiv = document.createElement('div');
          const placesService = new (window as any).google.maps.places.PlacesService(dummyDiv);
          setState({
            isLoaded: true,
            placesService,
            error: null
          });
        } catch (error) {
          console.error('Error initializing Places Service:', error);
          setState({
            isLoaded: false,
            placesService: null,
            error: 'Failed to initialize Google Places service'
          });
        }
      }
    };

    initializeGoogleMaps();
  }, []);

  return state;
};