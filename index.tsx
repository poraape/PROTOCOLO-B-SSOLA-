
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PROTOCOL_DATA } from './content/protocolData';
import { validateTreeDepth } from './services/validateTreeDepth';
import './index.css';
import 'leaflet/dist/leaflet.css';


if (import.meta.env.DEV) {
  const { maxDepth } = validateTreeDepth(PROTOCOL_DATA.decisionTree);
  console.info(`[Decisor] Profundidade máxima atual: ${maxDepth} nós.`);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
