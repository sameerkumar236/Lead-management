import { Building2, Eye, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, getInitials } from "../utils/formatters";
import StatusBadge from "./StatusBadge";

const LeadCard = ({ lead, onDelete }) => {
  return (
    <article className="surface-card p-4 transition hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">
            {getInitials(lead.name)}
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-950">{lead.name}</h3>
            <p className="truncate text-sm text-slate-500">{lead.company}</p>
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span className="truncate">{lead.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span>{lead.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-slate-400" aria-hidden="true" />
          <span>{lead.source}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs font-medium text-slate-400">{formatDate(lead.createdAt)}</span>
        <div className="flex items-center gap-1">
          <Link
            to={`/leads/${lead._id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
            aria-label={`View ${lead.name}`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to={`/leads/${lead._id}/edit`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label={`Edit ${lead.name}`}
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete(lead)}
            aria-label={`Delete ${lead.name}`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default LeadCard;
