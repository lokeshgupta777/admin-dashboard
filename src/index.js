import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <Dashboard />
  </BrowserRouter>
);
