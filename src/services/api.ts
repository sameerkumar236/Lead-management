import type { ApiResponse, DashboardStats, Lead, LeadFilters, LeadInput, LeadStatus } from "../types/lead";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    const message = payload.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return payload;
};

const toQueryString = (filters: LeadFilters) => {
  const params = new URLSearchParams();

  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.status !== "All") params.set("status", filters.status);
  if (filters.source !== "All") params.set("source", filters.source);
  params.set("sort", filters.sort);

  return params.toString();
};

export const leadApi = {
  async getLeads(filters: LeadFilters) {
    const query = toQueryString(filters);
    return request<Lead[]>(`/leads${query ? `?${query}` : ""}`);
  },

  async getLead(id: string) {
    return request<Lead>(`/leads/${id}`);
  },

  async createLead(input: LeadInput) {
    return request<Lead>("/leads", {
      method: "POST",
      body: JSON.stringify(input)
    });
  },

  async updateLead(id: string, input: LeadInput) {
    return request<Lead>(`/leads/${id}`, {
      method: "PUT",
      body: JSON.stringify(input)
    });
  },

  async updateLeadStatus(id: string, status: LeadStatus) {
    return request<Lead>(`/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    });
  },

  async deleteLead(id: string) {
    return request<Lead>(`/leads/${id}`, {
      method: "DELETE"
    });
  },

  async getDashboardStats() {
    return request<DashboardStats>("/dashboard/stats");
  }
};
