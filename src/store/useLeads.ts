import { useContext } from "react";
import { LeadContext } from "./leadStoreContext";

export const useLeads = () => {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error("useLeads must be used inside LeadProvider");
  }

  return context;
};
