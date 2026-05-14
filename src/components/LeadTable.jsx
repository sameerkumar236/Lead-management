import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatters";
import LeadCard from "./LeadCard";
import StatusBadge from "./StatusBadge";

const LeadTable = ({ leads, onDelete }) => {
  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft lg:block">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {["Name", "Email", "Phone", "Company", "Source", "Status", "Created", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold uppercase text-slate-500"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {leads.map((lead) => (
              <tr key={lead._id} className="transition hover:bg-slate-50">
                <td className="whitespace-nowrap px-5 py-4">
                  <div>
                    <p className="font-semibold text-slate-950">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.company}</p>
                  </div>
                </td>
                <td className="max-w-[220px] truncate px-5 py-4 text-sm text-slate-600">{lead.email}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{lead.phone}</td>
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                  {lead.company}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">{lead.source}</td>
                <td className="whitespace-nowrap px-5 py-4">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
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
                      onClick={() => onDelete(lead)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
                      aria-label={`Delete ${lead.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:hidden">
        {leads.map((lead) => (
          <LeadCard key={lead._id} lead={lead} onDelete={onDelete} />
        ))}
      </div>
    </>
  );
};

export default LeadTable;
