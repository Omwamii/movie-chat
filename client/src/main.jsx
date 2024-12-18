import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
// import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
)
