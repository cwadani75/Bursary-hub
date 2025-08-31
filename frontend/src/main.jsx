import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ wrap App in Router
import App from './App';
import './index.css'; // Tailwind or other styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ REQUIRED HERE */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
