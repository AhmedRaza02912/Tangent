import { StrictMode } from 'react'
import ReactGA from 'react-ga4'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
ReactGA.initialize('G-0Z5YXQL61Q');
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <App />
  </StrictMode>,
)
