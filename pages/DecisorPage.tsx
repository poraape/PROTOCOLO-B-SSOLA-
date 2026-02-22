import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DecisionTreeNavigator } from '../components/decision-v2/DecisionTreeNavigator';

export const DecisorPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Decisor: remount/reset solicitado', {
      key: location.key,
      path: location.pathname,
      search: location.search
    });
  }, [location.key, location.pathname, location.search]);

  // Força remontagem do navigator quando a rota/search muda, evitando estado residual.
  return <DecisionTreeNavigator key={`${location.key}:${location.pathname}:${location.search}`} />;
};
