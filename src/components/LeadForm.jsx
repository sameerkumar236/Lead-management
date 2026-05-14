import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LEAD_SOURCES, LEAD_STATUSES } from "../types/lead";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
  notes: ""
};

const LeadForm = ({
  mode,
  initialValues,
  isSubmitting = false,
  serverError,
  successMessage,
  onSubmit
}) => {
  const [form, setForm] = useState(initialValues ?? emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialValues ?? emptyForm);
  }, [initialValues]);

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Lead name is required.";
    if (!form.email.trim()) nextErrors.email = "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!form.company.trim()) nextErrors.company = "Company name is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    await onSubmit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      notes: form.notes.trim()
    });
  };

  return (
    <form className="surface-card p-5 sm:p-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Lead Name</span>
          <input
            className="input-field"
            value={form.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder="Avery Johnson"
          />
          {errors.name ? <p className="mt-1.5 text-sm text-red-600">{errors.name}</p> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Email</span>
          <input
            className="input-field"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="avery@company.com"
            type="email"
          />
          {errors.email ? <p className="mt-1.5 text-sm text-red-600">{errors.email}</p> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</span>
          <input
            className="input-field"
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
            placeholder="+1 (555) 555-0123"
          />
          {errors.phone ? <p className="mt-1.5 text-sm text-red-600">{errors.phone}</p> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Company Name</span>
          <input
            className="input-field"
            value={form.company}
            onChange={(event) => setField("company", event.target.value)}
            placeholder="Northstar Analytics"
          />
          {errors.company ? <p className="mt-1.5 text-sm text-red-600">{errors.company}</p> : null}
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Lead Source</span>
          <select
            className="select-field"
            value={form.source}
            onChange={(event) => setField("source", event.target.value)}
          >
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Status</span>
          <select
            className="select-field"
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">Notes</span>
          <textarea
            className="input-field min-h-36 resize-y"
            value={form.notes}
            onChange={(event) => setField("notes", event.target.value)}
            placeholder="Add qualification notes, next steps, or context for the sales team."
          />
        </label>
      </div>

      {serverError ? (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </div>
      ) : null}

      {successMessage ? (
        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link to="/leads" className="btn-secondary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to leads
        </Link>
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          <Save className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Saving..." : mode === "create" ? "Create Lead" : "Update Lead"}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
