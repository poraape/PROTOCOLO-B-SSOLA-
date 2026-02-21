import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DecisorPage } from './pages/DecisorPage';
import { FlowPage } from './pages/FlowPage';
import { NetworkPage } from './pages/NetworkPage';
import { FlowsListPage } from './pages/FlowsListPage';
import { BuscaPage } from './pages/BuscaPage';
import { TechnicalGlossaryPage } from './pages/TechnicalGlossaryPage';
import { StudentTermsPage } from './pages/StudentTermsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { FAQPage } from './pages/FAQPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import ProtocoloPage from './pages/ProtocoloPage';
import ModelosPage from './pages/ModelosPage';
import { buildStaticIndex } from './search/buildIndex';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { SCHOOL_CONFIG } from './content/schoolConfig';
import { getInitialTheme, setTheme } from './services/theme';
import { applyA11yPrefs, getInitialA11yPrefs } from './services/a11yPrefs';

const ENABLE_SIMULADOR_V2 = import.meta.env.VITE_ENABLE_SIMULADOR_V2 === 'true';

const App: React.FC = () => {


  useEffect(() => {
    applyA11yPrefs(getInitialA11yPrefs());
  }, []);

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--brand-primary', SCHOOL_CONFIG.primaryColor);
  }, []);

  useEffect(() => {
    const load = async () => {
      let protocolo = '';
      try {
        const res = await fetch('/protocol/protocolo.md');
        if (res.ok) protocolo = await res.text();
      } catch (_) {
        protocolo = '';
      }

      const anexos = {
        'Anexo I': 'Ficha de Registro Inicial com data, estudante, fatos observados e ações imediatas.',
        'Anexo II': 'Escuta qualificada com relato espontâneo, sinais de risco e encaminhamentos.'
      };

      buildStaticIndex(protocolo, anexos);
    };

    load();
  }, []);

  return (
    <Router>
      <Layout>
        <OfflineStatusBanner />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decisor" element={<DecisorPage />} />
          <Route path="/fluxos" element={<FlowsListPage />} />
          <Route path="/fluxos/:id" element={<FlowPage />} />
          <Route path="/rede" element={<NetworkPage />} />
          <Route path="/rede/:id" element={<NetworkPage />} />
          <Route path="/busca" element={<BuscaPage />} />
          <Route path="/glossary" element={<TechnicalGlossaryPage />} />
          <Route path="/student-terms" element={<StudentTermsPage />} />
          <Route path="/glossario" element={<Navigate to="/glossary" replace />} />
          <Route path="/resources" element={<Navigate to="/recursos" replace />} />
          <Route path="/simulador" element={<SimulatorPage />} />
          <Route
            path="/simulador/v2"
            element={ENABLE_SIMULADOR_V2 ? <SimulatorPage /> : <Navigate to="/simulador" replace />}
          />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/recursos" element={<ResourcesPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/versao" element={<AboutPage />} />
          <Route path="/protocolo" element={<ProtocoloPage />} />
          <Route path="/modelos" element={<ModelosPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
