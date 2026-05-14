import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import { useLeads } from "../store/useLeads";

const AddLeadPage = () => {
  const navigate = useNavigate();
  const { createLead, isSaving, error, clearError } = useLeads();
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (input) => {
    const lead = await createLead(input);
    setSuccessMessage("Lead created successfully.");
    window.setTimeout(() => navigate(`/leads/${lead._id}`), 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-blue-600">New opportunity</p>
        <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">Add Lead</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Capture the lead profile, source, and next-step context.
        </p>
      </div>
      <LeadForm
        mode="create"
        isSubmitting={isSaving}
        serverError={error}
        successMessage={successMessage}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddLeadPage;
