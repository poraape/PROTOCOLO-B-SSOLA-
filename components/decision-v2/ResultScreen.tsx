import React from 'react';
import { ResultScreenV2 } from '../decision/ResultScreenV2';

interface ResultScreenProps {
  leaf: any;
  onBack?: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ leaf, onBack }) => {
  return <ResultScreenV2 leafNode={leaf} services={[]} onRestart={onBack ?? (() => undefined)} />;
};

export default ResultScreen;
