import React from 'react';
import ReactDOM  from 'react-dom/client';
import './assets/index.css';
import App from './App';

const rootElement : HTMLElement | null = document.getElementById('root');
if (rootElement instanceof HTMLElement) {
  const root : ReactDOM.Root = ReactDOM.createRoot(rootElement as HTMLElement)  as ReactDOM.Root;
  root.render(
    <App />
  );
  
} else {
  console.error("El elemento 'root' no se encontró en el DOM.");
}

