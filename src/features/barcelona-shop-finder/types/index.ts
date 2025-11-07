export interface ShopFinderProps {
  buttonText?: string;
  className?: string;
  onSearchComplete?: (results: ShopResult[]) => void;
}

export interface ShopResult {
  id: string;
  name: string;
  address: string;
  rating?: number;
  status: 'OPERATIONAL' | 'CLOSED' | 'UNKNOWN';
  location: {
    lat: number;
    lng: number;
  };
  distance?: number; // in meters
  photos?: string[];
  priceLevel?: number;
  phoneNumber?: string;
  website?: string;
  openingHours?: string[];
}

export interface BarcelonaArea {
  id: string;
  name: string;
  district: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  searchTerms: string[]; // Alternative names for better search results
}

export interface SearchFormData {
  shopType: string;
  selectedArea: string;
}

export interface SearchState {
  isLoading: boolean;
  results: ShopResult[];
  error: string | null;
  hasSearched: boolean;
}

export interface GoogleMapsState {
  isLoaded: boolean;
  placesService: unknown | null; // Using unknown to avoid Google Maps type issues
  error: string | null;
}