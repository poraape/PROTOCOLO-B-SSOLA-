import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DecisorPage } from './pages/DecisorPage';
import { FlowPage } from './pages/FlowPage';
import { NetworkPage } from './pages/NetworkPage';
import { FlowsListPage } from './pages/FlowsListPage';
import { BuscaPage } from './pages/BuscaPage';
import { RecursosPage } from './pages/RecursosPage';
import ProtocoloPage from './pages/ProtocoloPage';
import { buildStaticIndex } from './search/buildIndex';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { SCHOOL_CONFIG } from './content/schoolConfig';
import { getInitialTheme, setTheme } from './services/theme';
import { applyA11yPrefs, getInitialA11yPrefs } from './services/a11yPrefs';

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
          <Route path="/resources" element={<Navigate to="/recursos" replace />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/faq" element={<Navigate to="/recursos?tab=faq" replace />} />
          <Route path="/glossary" element={<Navigate to="/recursos?tab=glossario" replace />} />
          <Route path="/glossario" element={<Navigate to="/recursos?tab=glossario" replace />} />
          <Route path="/modelos" element={<Navigate to="/recursos?tab=modelos" replace />} />
          <Route path="/simulador" element={<Navigate to="/recursos?tab=simulador" replace />} />
          <Route path="/simulador/v2" element={<Navigate to="/recursos?tab=simulador" replace />} />
          <Route path="/student-terms" element={<Navigate to="/recursos?tab=glossario" replace />} />
          <Route path="/about" element={<Navigate to="/recursos?tab=sobre" replace />} />
          <Route path="/sobre" element={<Navigate to="/recursos?tab=sobre" replace />} />
          <Route path="/versao" element={<Navigate to="/recursos?tab=sobre" replace />} />
          <Route path="/protocolo" element={<ProtocoloPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
