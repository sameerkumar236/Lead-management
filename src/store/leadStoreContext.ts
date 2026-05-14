import { createContext } from "react";
import type { DashboardStats, Lead, LeadFilters, LeadInput, LeadStatus } from "../types/lead";

export interface LeadContextValue {
  leads: Lead[];
  selectedLead: Lead | null;
  stats: DashboardStats | null;
  filters: LeadFilters;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  setFilters: (updates: Partial<LeadFilters>) => void;
  fetchLeads: () => Promise<void>;
  fetchLeadById: (id: string) => Promise<Lead>;
  fetchStats: () => Promise<void>;
  createLead: (input: LeadInput) => Promise<Lead>;
  updateLead: (id: string, input: LeadInput) => Promise<Lead>;
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<Lead>;
  deleteLead: (id: string) => Promise<void>;
  clearSelectedLead: () => void;
  clearError: () => void;
}

export const LeadContext = createContext<LeadContextValue | undefined>(undefined);
