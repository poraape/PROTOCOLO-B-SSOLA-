
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DecisorPage } from './pages/DecisorPage';
import { FlowPage } from './pages/FlowPage';
import { NetworkPage } from './pages/NetworkPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ImageEditorPage } from './pages/ImageEditorPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decisor" element={<DecisorPage />} />
          <Route path="/fluxos" element={<div className="p-8 text-center text-slate-500">Selecione um fluxo específico no dashboard ou decisor.</div>} />
          <Route path="/fluxos/:id" element={<FlowPage />} />
          <Route path="/rede" element={<NetworkPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/editor" element={<ImageEditorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
