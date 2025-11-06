import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Get the root element and create React root
const rootElement = document.getElementById('root')!;
const root = createRoot(rootElement);

// Render React app immediately
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
