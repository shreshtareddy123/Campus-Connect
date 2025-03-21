import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

import App from './App';
import './index.css'; // Optional global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline /> {/* Normalizes CSS */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
