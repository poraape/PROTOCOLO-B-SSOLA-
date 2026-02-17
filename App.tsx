
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DecisorPage } from './pages/DecisorPage';
import { FlowPage } from './pages/FlowPage';
import { NetworkPage } from './pages/NetworkPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FlowsListPage } from './pages/FlowsListPage';
import { BuscaPage } from './pages/BuscaPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decisor" element={<DecisorPage />} />
          <Route path="/fluxos" element={<FlowsListPage />} />
          <Route path="/fluxos/:id" element={<FlowPage />} />
          <Route path="/rede" element={<NetworkPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/busca" element={<BuscaPage />} />
          <Route path="/glossario" element={<GlossaryPage />} />
          <Route path="/simulador" element={<SimulatorPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/sobre" element={<AboutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
