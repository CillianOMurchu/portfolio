# Barcelona Shop Finder

A standalone feature that provides a full-screen modal interface for finding shops and businesses in different areas of Barcelona using the Google Maps Places API.

## Feature Overview

This feature implements:
- A trigger button that opens a full-screen modal
- A shop type input field for specifying what to search for
- A dropdown selector for Barcelona neighborhoods/areas
- Real-time search results displayed in a table format
- Integration with Google Maps Places API for accurate location data

## Implementation Steps

### Step 1: Project Setup and Dependencies

1. **Install Required Packages**
   ```bash
   npm install @googlemaps/js-api-loader
   npm install @types/google.maps --save-dev
   ```

2. **Environment Configuration**
   Add to your `.env` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

3. **Get Google Maps API Key**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the "Places API" and "Maps JavaScript API"
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

### Step 2: Folder Structure Setup

Create the following structure:
```
src/features/barcelona-shop-finder/
├── README.md (this file)
├── BarcelonaShopFinder.tsx (main component)
├── components/
│   ├── index.ts
│   ├── ShopFinderModal.tsx
│   ├── ShopTypeInput.tsx
│   ├── AreaDropdown.tsx
│   └── ResultsTable.tsx
├── hooks/
│   ├── index.ts
│   ├── useGoogleMaps.ts
│   └── useShopSearch.ts
├── utils/
│   ├── index.ts
│   ├── barcelonaAreas.ts
│   └── googleMapsHelpers.ts
├── types/
│   ├── index.ts
│   └── shopFinder.ts
└── tests/
    ├── BarcelonaShopFinder.test.tsx
    ├── ShopFinderModal.test.tsx
    └── hooks/
        └── useShopSearch.test.tsx
```

### Step 3: Data Preparation

1. **Barcelona Areas Data**
   Create a comprehensive list of Barcelona neighborhoods and districts:
   - Ciutat Vella (Gothic Quarter, El Raval, Barceloneta, etc.)
   - Eixample (Left and Right Eixample)
   - Sants-Montjuïc
   - Les Corts
   - Sarrià-Sant Gervasi
   - Gràcia
   - Horta-Guinardó
   - Nou Barris
   - Sant Andreu
   - Sant Martí

### Step 4: Component Implementation

1. **Main Trigger Component (`BarcelonaShopFinder.tsx`)**
   - Simple button that opens the modal
   - State management for modal visibility
   - Props for custom button styling

2. **Modal Component (`ShopFinderModal.tsx`)**
   - Full-screen overlay with backdrop
   - Close functionality (ESC key, backdrop click, X button)
   - Form layout with proper spacing
   - Responsive design for mobile/desktop

3. **Form Components**
   - **Shop Type Input**: Text input with validation
   - **Area Dropdown**: Searchable dropdown with Barcelona areas
   - **Search Button**: Triggers the API search

4. **Results Component (`ResultsTable.tsx`)**
   - Table displaying search results
   - Columns: Name, Address, Rating, Status, Distance
   - Loading states and empty states
   - Pagination for large result sets

### Step 5: Google Maps Integration

1. **API Loader Hook (`useGoogleMaps.ts`)**
   ```typescript
   // Initialize Google Maps API
   // Handle loading states and errors
   // Return places service instance
   ```

2. **Search Hook (`useShopSearch.ts`)**
   ```typescript
   // Combine shop type + Barcelona area
   // Call Places API text search
   // Format and filter results
   // Handle rate limiting and errors
   ```

3. **Helper Functions (`googleMapsHelpers.ts`)**
   ```typescript
   // Format search queries
   // Parse API responses
   // Calculate distances
   // Handle API errors
   ```

### Step 6: Search Logic Implementation

1. **Query Construction**
   ```typescript
   const searchQuery = `${shopType} in ${selectedArea}, Barcelona, Spain`;
   ```

2. **Places API Integration**
   - Use `places.textSearch()` for initial results
   - Filter results to ensure they're in Barcelona
   - Get additional details with `places.getDetails()`

3. **Result Processing**
   - Extract relevant information (name, address, rating, etc.)
   - Calculate distance from area center
   - Sort by relevance and rating
   - Handle duplicate results

### Step 7: Styling and UX

1. **Modal Styling**
   - Full-screen overlay with backdrop blur
   - Centered content with max-width
   - Smooth open/close animations using Framer Motion

2. **Form Styling**
   - Consistent with project's Tailwind design system
   - Proper focus states and accessibility
   - Loading indicators during search

3. **Table Styling**
   - Responsive table design
   - Hover effects and selection states
   - Empty state with helpful messaging

### Step 8: Error Handling

1. **API Error States**
   - Network errors
   - Rate limiting
   - Invalid API key
   - No results found

2. **User Input Validation**
   - Required field validation
   - Sanitize search inputs
   - Provide helpful error messages

### Step 9: Testing Strategy

1. **Unit Tests**
   - Component rendering
   - Form validation
   - Search result formatting
   - Hook functionality

2. **Integration Tests**
   - Modal open/close behavior
   - Search flow from input to results
   - API error handling

3. **E2E Tests** (Optional)
   - Full user journey
   - API integration testing

### Step 10: Performance Optimization

1. **API Optimization**
   - Debounce search inputs
   - Cache recent searches
   - Implement request cancellation

2. **Component Optimization**
   - Lazy load the modal component
   - Virtualize large result lists
   - Optimize re-renders

### Step 11: Accessibility

1. **Keyboard Navigation**
   - Tab order management
   - ESC key to close modal
   - Enter to submit search

2. **Screen Reader Support**
   - Proper ARIA labels
   - Focus management
   - Status announcements

### Step 12: Integration with Main App

1. **Export from Feature**
   ```typescript
   // src/features/barcelona-shop-finder/index.ts
   export { default as BarcelonaShopFinder } from './BarcelonaShopFinder';
   export type { ShopFinderProps } from './types';
   ```

2. **Import in Main App**
   ```typescript
   import { BarcelonaShopFinder } from '@/features/barcelona-shop-finder';
   ```

## Usage Example

```tsx
import { BarcelonaShopFinder } from '@/features/barcelona-shop-finder';

function App() {
  return (
    <div>
      <h1>My Portfolio</h1>
      <BarcelonaShopFinder 
        buttonText="Find Barcelona Shops"
        className="my-custom-button-style"
      />
    </div>
  );
}
```

## API Reference

### `BarcelonaShopFinder` Props

```typescript
interface ShopFinderProps {
  buttonText?: string;
  className?: string;
  onSearchComplete?: (results: ShopResult[]) => void;
}
```

### Search Result Type

```typescript
interface ShopResult {
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
}
```

## Security Considerations

1. **API Key Security**
   - Use environment variables
   - Implement domain restrictions
   - Monitor API usage

2. **Input Sanitization**
   - Validate all user inputs
   - Prevent injection attacks
   - Rate limit searches

## Future Enhancements

1. **Map Integration**
   - Show results on interactive map
   - Directions to selected locations

2. **Favorites System**
   - Save favorite shops
   - Local storage persistence

3. **Advanced Filters**
   - Price range filtering
   - Open hours filtering
   - Distance radius selection

## Dependencies

- `@googlemaps/js-api-loader`: Google Maps API integration
- `framer-motion`: Smooth animations
- `tailwindcss`: Styling system
- `react`: UI framework
- `typescript`: Type safety

## Browser Compatibility

- Modern browsers with ES2020 support
- Mobile Safari, Chrome, Firefox
- No IE support (uses modern JavaScript features)