import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { WorkflowPhase, ResearchExperiment, AssumptionId, NextInvestigation, ExperimentResults } from '../types/experiment';
import { INITIAL_CANONICAL_EXPERIMENT } from '../data/canonicalExperiment';
import { computeDeterministicResults, ExecutionSimulationState } from '../services/experimentEngine';
import { runExperiment, extractBackendParameters } from '../services/api';

interface ExperimentContextType {
  currentPhase: WorkflowPhase;
  goToPhase: (phase: WorkflowPhase) => void;
  experiment: ResearchExperiment;
  updateQuestion: (newQuestion: string) => void;
  selectAssumptionOption: (cardId: AssumptionId, optionId: string, customVal?: string) => void;
  toggleConfirmAssumption: (cardId: AssumptionId) => void;
  confirmAllAssumptions: () => void;
  resetAssumptionsToDefault: () => void;
  confirmedCount: number;
  totalAmbiguities: number;
  executionSimulation: ExecutionSimulationState;
  startExecutionSimulation: (onComplete?: () => void) => void;
  forkInvestigation: (investigation: NextInvestigation) => void;
  resetToCanonical: () => void;
}

const ExperimentContext = createContext<ExperimentContextType | null>(null);

const STORAGE_KEY = 'signallab_experiment_v5';
const PHASE_KEY = 'signallab_phase_v1';

export const ExperimentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState<WorkflowPhase>(() => {
    const saved = localStorage.getItem(PHASE_KEY);
    return (saved as WorkflowPhase) || 'ask';
  });

  const [experiment, setExperiment] = useState<ResearchExperiment>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CANONICAL_EXPERIMENT,
          ...parsed,
          threshold: parsed.threshold !== undefined ? parsed.threshold : INITIAL_CANONICAL_EXPERIMENT.threshold,
          entryTiming: parsed.entryTiming || INITIAL_CANONICAL_EXPERIMENT.entryTiming,
          holdingDays: parsed.holdingDays || INITIAL_CANONICAL_EXPERIMENT.holdingDays,
          transactionCost: parsed.transactionCost !== undefined ? parsed.transactionCost : INITIAL_CANONICAL_EXPERIMENT.transactionCost,
        };
      } catch (e) {
        console.error('Failed to parse stored experiment', e);
      }
    }
    return INITIAL_CANONICAL_EXPERIMENT;
  });

  const [executionSimulation, setExecutionSimulation] = useState<ExecutionSimulationState>({
    progressPct: 100,
    processedEvents: 1842,
    totalEvents: 1842,
    isComplete: true,
    statusText: 'Execution Completed',
    checks: {
      entryRule: true,
      holdingPeriod: true,
      transactionCosts: true,
      nonOverlapping: true,
    },
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experiment));
  }, [experiment]);

  useEffect(() => {
    localStorage.setItem(PHASE_KEY, currentPhase);
  }, [currentPhase]);

  const goToPhase = useCallback((phase: WorkflowPhase) => {
    setCurrentPhase(phase);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateQuestion = useCallback((newQuestion: string) => {
    setExperiment(prev => ({
      ...prev,
      originalQuestion: newQuestion,
      question: newQuestion,
    }));
  }, []);

  const selectAssumptionOption = useCallback((cardId: AssumptionId, optionId: string, customVal?: string) => {
    setExperiment(prev => {
      const card = prev.assumptions[cardId];
      if (!card) return prev;

      const option = card.options.find(o => o.id === optionId);
      const newLabel = option ? option.label : card.confirmedValue;

      const updatedCard = {
        ...card,
        selectedOptionId: optionId,
        confirmedValue: newLabel,
        customValue: customVal !== undefined ? customVal : card.customValue,
      };

      let newThreshold = prev.threshold;
      let newThresholdPct = prev.triggerThresholdPct;
      let newEntryTiming = prev.entryTiming;
      let newEntryProtocol = prev.entryProtocol;
      let newHoldingDays = prev.holdingDays;
      let newHoldingHorizonDays = prev.holdingHorizonDays;
      let newExitProtocol = prev.exitProtocol;

      if (cardId === 'card1') {
        if (optionId === 'A') {
          newThreshold = 0.03;
          newThresholdPct = 3.0;
        } else if (optionId === 'B' || optionId === 'C') {
          newThreshold = 0.05;
          newThresholdPct = 5.0;
        } else if (optionId === 'D') {
          const val = parseFloat(customVal || card.customValue || '5.0');
          if (!isNaN(val) && val > 0) {
            newThreshold = val > 1 ? val / 100 : val;
            newThresholdPct = val > 1 ? val : val * 100;
          }
        }
      } else if (cardId === 'card2') {
        newEntryTiming = 'T+1_OPEN';
        newEntryProtocol = newLabel;
      } else if (cardId === 'card3') {
        if (optionId === '1' || optionId === '3' || optionId === '5' || optionId === '10') {
          newHoldingDays = parseInt(optionId, 10);
        } else if (optionId === 'custom') {
          const val = parseInt(customVal || card.customValue || '5', 10);
          if (!isNaN(val) && val >= 1) {
            newHoldingDays = val;
          }
        }
        newHoldingHorizonDays = newHoldingDays;
        newExitProtocol = `${newHoldingDays}th trading session close (T+${newHoldingDays} @ 15:30 IST)`;
      }

      const newAssumptions = {
        ...prev.assumptions,
        [cardId]: updatedCard,
      };

      const updatedExp: ResearchExperiment = {
        ...prev,
        threshold: newThreshold,
        triggerThresholdPct: newThresholdPct,
        entryTiming: newEntryTiming,
        entryProtocol: newEntryProtocol,
        holdingDays: newHoldingDays,
        holdingHorizonDays: newHoldingHorizonDays,
        exitProtocol: newExitProtocol,
        assumptions: newAssumptions,
      };

      // Recalculate deterministic results
      const { results, auditLogs } = computeDeterministicResults(updatedExp);
      return {
        ...updatedExp,
        results,
        auditLogs,
      };
    });
  }, []);

  const toggleConfirmAssumption = useCallback((cardId: AssumptionId) => {
    setExperiment(prev => {
      const card = prev.assumptions[cardId];
      if (!card) return prev;

      const nextConfirmed = !card.isConfirmed;

      return {
        ...prev,
        thresholdConfirmed: cardId === 'card1' ? nextConfirmed : prev.thresholdConfirmed,
        entryTimingConfirmed: cardId === 'card2' ? nextConfirmed : prev.entryTimingConfirmed,
        holdingDaysConfirmed: cardId === 'card3' ? nextConfirmed : prev.holdingDaysConfirmed,
        assumptions: {
          ...prev.assumptions,
          [cardId]: {
            ...card,
            isConfirmed: nextConfirmed,
          },
        },
      };
    });
  }, []);

  const confirmAllAssumptions = useCallback(() => {
    setExperiment(prev => {
      const updatedAssumptions = { ...prev.assumptions };
      (Object.keys(updatedAssumptions) as AssumptionId[]).forEach(key => {
        updatedAssumptions[key] = {
          ...updatedAssumptions[key],
          isConfirmed: true,
        };
      });
      return {
        ...prev,
        thresholdConfirmed: true,
        entryTimingConfirmed: true,
        holdingDaysConfirmed: true,
        assumptions: updatedAssumptions,
      };
    });
  }, []);

  const resetAssumptionsToDefault = useCallback(() => {
    setExperiment(prev => {
      const defaults = INITIAL_CANONICAL_EXPERIMENT.assumptions;
      const updatedAssumptions = {
        ...prev.assumptions,
        card1: { ...defaults.card1 },
        card2: { ...defaults.card2 },
        card3: { ...defaults.card3 },
        card4: { ...defaults.card4 },
      };
      const updatedExp: ResearchExperiment = {
        ...prev,
        threshold: INITIAL_CANONICAL_EXPERIMENT.threshold,
        thresholdConfirmed: false,
        triggerThresholdPct: INITIAL_CANONICAL_EXPERIMENT.triggerThresholdPct,
        entryTiming: INITIAL_CANONICAL_EXPERIMENT.entryTiming,
        entryTimingConfirmed: false,
        entryProtocol: INITIAL_CANONICAL_EXPERIMENT.entryProtocol,
        holdingDays: INITIAL_CANONICAL_EXPERIMENT.holdingDays,
        holdingDaysConfirmed: false,
        holdingHorizonDays: INITIAL_CANONICAL_EXPERIMENT.holdingHorizonDays,
        exitProtocol: INITIAL_CANONICAL_EXPERIMENT.exitProtocol,
        assumptions: updatedAssumptions,
      };
      const { results, auditLogs } = computeDeterministicResults(updatedExp);
      return {
        ...updatedExp,
        results,
        auditLogs,
      };
    });
  }, []);

  const resetToCanonical = useCallback(() => {
    setExperiment(INITIAL_CANONICAL_EXPERIMENT);
    setCurrentPhase('ask');
  }, []);

  // Count confirmed ambiguities (out of card1, card2, card3)
  const confirmedCount = ['card1', 'card2', 'card3'].filter(
    k => experiment.assumptions[k as AssumptionId]?.isConfirmed
  ).length;

  const totalAmbiguities = 3;

  // Run execution simulation connected to backend API
  const startExecutionSimulation = useCallback(async (onComplete?: () => void) => {
    const params = extractBackendParameters(experiment);

    setExecutionSimulation({
      progressPct: 15,
      processedEvents: 0,
      totalEvents: experiment.results.sampleSize || 1842,
      isComplete: false,
      isLoading: true,
      error: null,
      statusText: 'Running...',
      checks: {
        entryRule: true,
        holdingPeriod: false,
        transactionCosts: false,
        nonOverlapping: false,
      },
    });

    // Realistic progress animation while query processes
    let currentPct = 25;
    const progressTimer = setInterval(() => {
      currentPct = Math.min(85, currentPct + 15);
      setExecutionSimulation(prev => ({
        ...prev,
        progressPct: currentPct,
        statusText: 'Running...',
        checks: {
          entryRule: true,
          holdingPeriod: currentPct >= 40,
          transactionCosts: currentPct >= 60,
          nonOverlapping: currentPct >= 80,
        },
      }));
    }, 150);

    try {
      const response = await runExperiment(params);

      clearInterval(progressTimer);

      const totalEvents = response.sampleSize;

      setExecutionSimulation({
        progressPct: 100,
        processedEvents: totalEvents,
        totalEvents: totalEvents,
        isComplete: true,
        isLoading: false,
        error: null,
        statusText: 'Execution Completed',
        checks: {
          entryRule: true,
          holdingPeriod: true,
          transactionCosts: true,
          nonOverlapping: true,
        },
      });

      const updatedResults: ExperimentResults = {
        sampleSize: response.sampleSize,
        averageGrossReturn: response.averageGrossReturn,
        medianReturn: response.medianReturn,
        winRate: response.winRate,
        winningTrades: response.winningTrades,
        losingTrades: response.losingTrades,
        averageNetReturn: response.averageNetReturn,
        evidenceLevel: response.evidenceLevel,
        conclusion: response.conclusion,
        pValue: response.pValue,
        tStatistic: response.tStatistic,
        kurtosis: response.kurtosis,
        skewness: response.skewness,
        standardDeviation: response.standardDeviation,
        maxAdverseExcursion: response.maxAdverseExcursion || 0,
        sharpeRatio: response.sharpeRatio || 0,
        distributionBins: response.distributionBins,
        regimes: response.regimes || response.results?.regimes,
      };

      setExperiment(prev => ({
        ...prev,
        status: 'completed',
        results: updatedResults,
        auditLogs: response.events.length > 0 ? response.events : prev.auditLogs,
        totalTradingSessions: response.datasetInfo?.totalSessions || prev.totalTradingSessions,
        datasetName: response.datasetInfo?.name || prev.datasetName,
      }));

      if (onComplete) onComplete();
    } catch (err: unknown) {
      clearInterval(progressTimer);
      const errMsg = err instanceof Error ? err.message : 'Backend offline';
      console.warn('Backend API call failed, using deterministic local engine:', errMsg);

      const fallback = computeDeterministicResults(experiment);
      const totalEvents = fallback.results.sampleSize;

      setExecutionSimulation({
        progressPct: 100,
        processedEvents: totalEvents,
        totalEvents: totalEvents,
        isComplete: true,
        isLoading: false,
        error: errMsg,
        statusText: 'Execution Failed',
        checks: {
          entryRule: true,
          holdingPeriod: true,
          transactionCosts: true,
          nonOverlapping: true,
        },
      });

      setExperiment(prev => ({
        ...prev,
        status: 'completed',
        results: fallback.results,
        auditLogs: fallback.auditLogs,
      }));

      if (onComplete) onComplete();
    }
  }, [experiment]);

  // Fork investigation
  const forkInvestigation = useCallback((investigation: NextInvestigation) => {
    setExperiment(prev => ({
      ...prev,
      id: `EXP-${Date.now().toString().slice(-4)}`,
      title: `${prev.market} · ${investigation.title}`,
      originalQuestion: investigation.query,
      question: investigation.query,
      status: 'draft',
      thresholdConfirmed: false,
      entryTimingConfirmed: false,
      holdingDaysConfirmed: false,
      assumptions: {
        ...prev.assumptions,
        card1: {
          ...prev.assumptions.card1,
          isConfirmed: false,
        },
        card2: {
          ...prev.assumptions.card2,
          isConfirmed: false,
        },
        card3: {
          ...prev.assumptions.card3,
          isConfirmed: false,
        },
      },
    }));
    setCurrentPhase('clarify');
  }, []);

  return (
    <ExperimentContext.Provider
      value={{
        currentPhase,
        goToPhase,
        experiment,
        updateQuestion,
        selectAssumptionOption,
        toggleConfirmAssumption,
        confirmAllAssumptions,
        resetAssumptionsToDefault,
        confirmedCount,
        totalAmbiguities,
        executionSimulation,
        startExecutionSimulation,
        forkInvestigation,
        resetToCanonical,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};

export const useExperiment = () => {
  const context = useContext(ExperimentContext);
  if (!context) {
    throw new Error('useExperiment must be used within an ExperimentProvider');
  }
  return context;
};
