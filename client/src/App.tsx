import React from 'react';
import { ExperimentProvider, useExperiment } from './state/ExperimentContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ResearchHome } from './pages/ResearchHome/index';
import { ClarifyAmbiguity } from './pages/Clarify/index';
import { DefineExperiment } from './pages/Define/index';
import { TestExecution } from './pages/Test/index';
import { LearnFindings } from './pages/Learn/index';
import { ExperimentReport } from './pages/ExperimentReport/index';

const WorkspaceContent: React.FC = () => {
  const { currentPhase } = useExperiment();

  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-on-surface">
      <Header />
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-2.5rem)] flex-1 pb-12">
        {currentPhase === 'ask' && <ResearchHome />}
        {currentPhase === 'clarify' && <ClarifyAmbiguity />}
        {currentPhase === 'define' && <DefineExperiment />}
        {currentPhase === 'test' && <TestExecution />}
        {currentPhase === 'learn' && <LearnFindings />}
        {currentPhase === 'report' && <ExperimentReport />}
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ExperimentProvider>
      <WorkspaceContent />
    </ExperimentProvider>
  );
};

export default App;
