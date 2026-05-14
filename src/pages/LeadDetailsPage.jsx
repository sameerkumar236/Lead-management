import { ArrowLeft, Building2, CalendarClock, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import { useLeads } from "../store/useLeads";
import { LEAD_STATUSES } from "../types/lead";
import { formatDateTime, getInitials } from "../utils/formatters";
import { statusDotStyles } from "../utils/status";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    selectedLead,
    fetchLeadById,
    updateLeadStatus,
    deleteLead,
    clearSelectedLead,
    clearError,
    isLoading,
    isSaving,
    error
  } = useLeads();
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    clearError();

    if (id) {
      void fetchLeadById(id).catch(() => undefined);
    }

    return () => clearSelectedLead();
  }, [id, fetchLeadById, clearSelectedLead, clearError]);

  const statusIndex = useMemo(() => {
    if (!selectedLead) return 0;
    return LEAD_STATUSES.findIndex((status) => status === selectedLead.status);
  }, [selectedLead]);

  const handleStatusChange = async (status) => {
    if (!selectedLead || status === selectedLead.status) return;
    await updateLeadStatus(selectedLead._id, status).catch(() => undefined);
  };

  const handleDelete = async () => {
    if (!selectedLead) return;

    try {
      await deleteLead(selectedLead._id);
      setConfirmOpen(false);
      navigate("/leads");
    } catch {
      setConfirmOpen(false);
    }
  };

  if (isLoading && !selectedLead) {
    return <LoadingSpinner label="Loading lead details" />;
  }

  if (!selectedLead) {
    return (
      <div className="surface-card p-8">
        <p className="font-semibold text-slate-950">Lead not found</p>
        <Link to="/leads" className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
          Back to leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Link to="/leads" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to leads
          </Link>
          <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950">Lead Details</h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={`/leads/${selectedLead._id}/edit`} className="btn-secondary">
            <Pencil className="h-4 w-4" aria-hidden="true" />
            Edit
          </Link>
          <button type="button" className="btn-danger" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete
          </button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <section className="surface-card p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-xl font-bold text-white">
              {getInitials(selectedLead.name)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-2xl font-bold text-slate-950">{selectedLead.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-500">{selectedLead.company}</p>
              <div className="mt-3">
                <StatusBadge status={selectedLead.status} />
              </div>
            </div>
          </div>

          <label className="mt-6 block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-700">Update Status</span>
            <select
              className="select-field"
              value={selectedLead.status}
              disabled={isSaving}
              onChange={(event) => void handleStatusChange(event.target.value)}
            >
              {LEAD_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
            {[
              { icon: Mail, label: "Email", value: selectedLead.email },
              { icon: Phone, label: "Phone", value: selectedLead.phone },
              { icon: Building2, label: "Company", value: selectedLead.company },
              { icon: CalendarClock, label: "Created", value: formatDateTime(selectedLead.createdAt) }
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-400">{item.label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-slate-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <section className="surface-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Status Timeline</h3>
                <p className="mt-1 text-sm text-slate-500">New to converted pipeline progression.</p>
              </div>
              <span className="text-sm font-semibold text-slate-500">{selectedLead.source}</span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {LEAD_STATUSES.map((status, index) => {
                const isActive = index <= statusIndex;
                return (
                  <div key={status} className="relative">
                    {index < LEAD_STATUSES.length - 1 ? (
                      <div
                        className={`absolute left-6 top-6 hidden h-0.5 w-[calc(100%+1rem)] sm:block ${
                          index < statusIndex ? "bg-emerald-400" : "bg-slate-200"
                        }`}
                      />
                    ) : null}
                    <div className="relative flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-bold text-white ${
                          isActive ? statusDotStyles[status] : "bg-slate-300"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-950">{status}</p>
                        <p className="text-sm text-slate-500">{isActive ? "Reached" : "Pending"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-slate-950">Company Information</h3>
              <dl className="mt-5 grid gap-4">
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Company</dt>
                  <dd className="mt-1 text-base font-semibold text-slate-950">{selectedLead.company}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Lead Source</dt>
                  <dd className="mt-1 text-base font-semibold text-slate-950">{selectedLead.source}</dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold text-slate-500">Last Updated</dt>
                  <dd className="mt-1 text-base font-semibold text-slate-950">
                    {formatDateTime(selectedLead.updatedAt)}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-slate-950">Notes</h3>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                {selectedLead.notes || "No notes added."}
              </p>
            </div>
          </section>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete lead"
        description={`Delete ${selectedLead.name} from LeadFlow CRM? This action cannot be undone.`}
        isLoading={isSaving}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default LeadDetailsPage;
