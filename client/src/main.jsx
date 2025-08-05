
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import AppWalletProvider from './context/WalletProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWalletProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AppWalletProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
