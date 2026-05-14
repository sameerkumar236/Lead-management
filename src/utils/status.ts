import type { LeadStatus } from "../types/lead";

export const statusStyles: Record<LeadStatus, string> = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  "In Progress": "bg-orange-50 text-orange-700 ring-orange-200",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-200"
};

export const statusDotStyles: Record<LeadStatus, string> = {
  New: "bg-blue-500",
  "In Progress": "bg-orange-500",
  Converted: "bg-emerald-500"
};

export const statusChartColors: Record<LeadStatus, string> = {
  New: "#2563eb",
  "In Progress": "#f97316",
  Converted: "#16a34a"
};
