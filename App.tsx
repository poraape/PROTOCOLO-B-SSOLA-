import React, { Suspense, lazy, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { DecisorPage } from './pages/DecisorPage';
import { FlowPage } from './pages/FlowPage';
import { NetworkPage } from './pages/NetworkPage';
import { FlowsListPage } from './pages/FlowsListPage';
import { BuscaPage } from './pages/BuscaPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import ProtocoloPage from './pages/ProtocoloPage';
import ModelosPage from './pages/ModelosPage';
import { buildStaticIndex } from './search/buildIndex';
import { OfflineStatusBanner } from './components/OfflineStatusBanner';
import { SCHOOL_CONFIG } from './content/schoolConfig';

const DecisionTreeNavigator = lazy(() => import('./components/decision-v2/DecisionTreeNavigator'));

const App: React.FC = () => {
  const [useV2, setUseV2] = useState(false);

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

  const decisorElement = (
    <>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#F3F4F6',
          borderBottom: '1px solid #E5E7EB',
          textAlign: 'center'
        }}
      >
        <label style={{ fontSize: '16px', fontWeight: '600' }}>
          <input
            type="checkbox"
            checked={useV2}
            onChange={(e) => setUseV2(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Usar Nova Versão V2 (Experimental)
        </label>
      </div>

      {/* TODO: Remover feature flag e ComponenteAntigo após validação da V2 */}
      {useV2 ? (
        <Suspense fallback={<div style={{ padding: '16px', textAlign: 'center' }}>Carregando...</div>}>
          <DecisionTreeNavigator />
        </Suspense>
      ) : (
        <DecisorPage />
      )}
    </>
  );

  return (
    <Router>
      <Layout>
        <OfflineStatusBanner />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/decisor" element={decisorElement} />
          <Route path="/fluxos" element={<FlowsListPage />} />
          <Route path="/fluxos/:id" element={<FlowPage />} />
          <Route path="/rede" element={<NetworkPage />} />
          <Route path="/rede/:id" element={<NetworkPage />} />
          <Route path="/busca" element={<BuscaPage />} />
          <Route path="/glossario" element={<GlossaryPage />} />
          <Route path="/simulador" element={<SimulatorPage />} />
          <Route path="/faq" element={<FAQPage />} />
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
