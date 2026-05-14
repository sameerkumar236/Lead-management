import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useLeads } from "../store/useLeads";

const EditLeadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedLead, fetchLeadById, updateLead, clearSelectedLead, clearError, isLoading, isSaving, error } =
    useLeads();
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    clearError();

    if (id) {
      void fetchLeadById(id).catch(() => undefined);
    }

    return () => clearSelectedLead();
  }, [id, fetchLeadById, clearSelectedLead, clearError]);

  const initialValues = useMemo(() => {
    if (!selectedLead) return undefined;

    return {
      name: selectedLead.name,
      email: selectedLead.email,
      phone: selectedLead.phone,
      company: selectedLead.company,
      source: selectedLead.source,
      status: selectedLead.status,
      notes: selectedLead.notes
    };
  }, [selectedLead]);

  const handleSubmit = async (input) => {
    if (!id) return;

    const lead = await updateLead(id, input);
    setSuccessMessage("Lead updated successfully.");
    window.setTimeout(() => navigate(`/leads/${lead._id}`), 500);
  };

  if (isLoading && !selectedLead) {
    return <LoadingSpinner label="Loading lead" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-blue-600">Lead profile</p>
        <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">Edit Lead</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Keep lead information accurate as the opportunity moves through the pipeline.
        </p>
      </div>
      <LeadForm
        mode="edit"
        initialValues={initialValues}
        isSubmitting={isSaving}
        serverError={error}
        successMessage={successMessage}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditLeadPage;
