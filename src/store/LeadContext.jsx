import { useCallback, useMemo, useState } from "react";
import { leadApi } from "../services/api";
import { LeadContext } from "./leadStoreContext";

const defaultFilters = {
  search: "",
  status: "All",
  source: "All",
  sort: "newest"
};

export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [stats, setStats] = useState(null);
  const [filters, setLeadFilters] = useState(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleError = useCallback((err) => {
    const message = err instanceof Error ? err.message : "Unexpected application error.";
    setError(message);
  }, []);

  const setFilters = useCallback((updates) => {
    setLeadFilters((current) => ({ ...current, ...updates }));
  }, []);

  const clearSelectedLead = useCallback(() => setSelectedLead(null), []);
  const clearError = useCallback(() => setError(null), []);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await leadApi.getLeads(filters);
      setLeads(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters, handleError]);

  const fetchLeadById = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await leadApi.getLead(id);
      setSelectedLead(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await leadApi.getDashboardStats();
      setStats(response.data);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  }, [handleError]);

  const createLead = useCallback(async (input) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await leadApi.createLead(input);
      setLeads((current) => [response.data, ...current]);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [handleError]);

  const updateLead = useCallback(async (id, input) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await leadApi.updateLead(id, input);
      setLeads((current) => current.map((lead) => (lead._id === id ? response.data : lead)));
      setSelectedLead(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [handleError]);

  const updateLeadStatus = useCallback(async (id, status) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await leadApi.updateLeadStatus(id, status);
      setLeads((current) => current.map((lead) => (lead._id === id ? response.data : lead)));
      setSelectedLead(response.data);
      return response.data;
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [handleError]);

  const deleteLead = useCallback(async (id) => {
    setIsSaving(true);
    setError(null);

    try {
      await leadApi.deleteLead(id);
      setLeads((current) => current.filter((lead) => lead._id !== id));
      setSelectedLead((current) => (current?._id === id ? null : current));
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [handleError]);

  const value = useMemo(
    () => ({
      leads,
      selectedLead,
      stats,
      filters,
      isLoading,
      isSaving,
      error,
      setFilters,
      fetchLeads,
      fetchLeadById,
      fetchStats,
      createLead,
      updateLead,
      updateLeadStatus,
      deleteLead,
      clearSelectedLead,
      clearError
    }),
    [
      leads,
      selectedLead,
      stats,
      filters,
      isLoading,
      isSaving,
      error,
      fetchLeads,
      fetchLeadById,
      fetchStats,
      createLead,
      updateLead,
      updateLeadStatus,
      deleteLead,
      setFilters,
      clearSelectedLead,
      clearError
    ]
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};
