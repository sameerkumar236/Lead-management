export const LEAD_SOURCES = ["Website", "Referral", "Social Media", "Ads", "Other"] as const;
export const LEAD_STATUSES = ["New", "In Progress", "Converted"] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadSort = "newest" | "oldest";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: LeadSource;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type LeadInput = Pick<
  Lead,
  "name" | "email" | "phone" | "company" | "source" | "status" | "notes"
>;

export interface LeadFilters {
  search: string;
  status: LeadStatus | "All";
  source: LeadSource | "All";
  sort: LeadSort;
}

export interface SourceBreakdown {
  _id: LeadSource;
  count: number;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  inProgressLeads: number;
  convertedLeads: number;
  conversionRate: number;
  recentLeads: Lead[];
  sourceBreakdown: SourceBreakdown[];
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  errors?: Record<string, string>;
}
