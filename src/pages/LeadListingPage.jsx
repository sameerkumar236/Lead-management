import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";
import FilterDropdown from "../components/FilterDropdown";
import LeadTable from "../components/LeadTable";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBar from "../components/SearchBar";
import { useLeads } from "../store/useLeads";
import { LEAD_SOURCES, LEAD_STATUSES } from "../types/lead";

const statusOptions = ["All", ...LEAD_STATUSES];
const sourceOptions = ["All", ...LEAD_SOURCES];
const sortOptions = ["newest", "oldest"];

const LeadListingPage = () => {
  const { leads, filters, setFilters, fetchLeads, deleteLead, isLoading, isSaving, error } = useLeads();
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchLeads().catch(() => undefined);
    }, 250);

    return () => window.clearTimeout(timer);
  }, [fetchLeads]);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    await deleteLead(deleteTarget._id).catch(() => undefined);
    setDeleteTarget(null);
  };

  const hasFilters =
    Boolean(filters.search.trim()) || filters.status !== "All" || filters.source !== "All" || filters.sort !== "newest";

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Pipeline records</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">Lead Listing</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Search, filter, and manage every prospect in the active pipeline.
          </p>
        </div>
        <Link to="/leads/new" className="btn-primary">
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          Add Lead
        </Link>
      </div>

      <section className="surface-card p-4">
        <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_160px]">
          <SearchBar
            value={filters.search}
            onChange={(value) => setFilters({ search: value })}
            placeholder="Search by name, email, or company"
          />
          <FilterDropdown
            label="Status"
            value={filters.status}
            options={statusOptions}
            onChange={(value) => setFilters({ status: value })}
          />
          <FilterDropdown
            label="Source"
            value={filters.source}
            options={sourceOptions}
            onChange={(value) => setFilters({ source: value })}
          />
          <FilterDropdown
            label="Sort"
            value={filters.sort}
            options={sortOptions}
            onChange={(value) => setFilters({ sort: value })}
          />
        </div>
      </section>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading && leads.length === 0 ? (
        <LoadingSpinner label="Loading leads" />
      ) : leads.length > 0 ? (
        <LeadTable leads={leads} onDelete={setDeleteTarget} />
      ) : (
        <EmptyState
          title={hasFilters ? "No matching leads" : "No leads yet"}
          description={
            hasFilters
              ? "Adjust the search or filters to widen the lead list."
              : "Create your first lead or run the seed script to load demo pipeline data."
          }
          action={
            <Link to="/leads/new" className="btn-primary">
              <PlusCircle className="h-4 w-4" aria-hidden="true" />
              Add Lead
            </Link>
          }
        />
      )}

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Delete lead"
        description={`Delete ${deleteTarget?.name ?? "this lead"} from LeadFlow CRM? This action cannot be undone.`}
        isLoading={isSaving}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LeadListingPage;
