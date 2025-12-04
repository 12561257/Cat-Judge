export enum AppStage {
  LANDING = 'LANDING',
  INPUT = 'INPUT',
  LOADING = 'LOADING',
  VERDICT = 'VERDICT',
  RESTORATION = 'RESTORATION',
}

export type Language = 'en' | 'zh';

export interface PartyInput {
  name: string;
  event: string;
  grievance: string;
}

export interface ReparationTask {
  id: string;
  party: 'A' | 'B' | 'Both';
  task: string;
  completed: boolean;
}

export interface VerdictData {
  rootAnalysis: string;
  partyAScore: number; // Percentage blame
  partyBScore: number; // Percentage blame
  decreeTitle: string;
  decreeContent: string;
  reparations: {
    party: 'A' | 'B' | 'Both';
    task: string;
  }[];
}

export interface CaseData {
  partyA: PartyInput;
  partyB: PartyInput;
}