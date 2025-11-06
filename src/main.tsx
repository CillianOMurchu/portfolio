import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Remove instant loader when React starts
const instantLoader = document.getElementById('instant-loader');
if (instantLoader) {
  instantLoader.style.opacity = '0';
  instantLoader.style.transition = 'opacity 0.3s ease';
  setTimeout(() => instantLoader.remove(), 300);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
