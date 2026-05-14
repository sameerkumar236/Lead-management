import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AddLeadPage from "../pages/AddLeadPage";
import DashboardPage from "../pages/DashboardPage";
import EditLeadPage from "../pages/EditLeadPage";
import HomePage from "../pages/HomePage";
import LeadDetailsPage from "../pages/LeadDetailsPage";
import LeadListingPage from "../pages/LeadListingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/leads" element={<LeadListingPage />} />
        <Route path="/leads/new" element={<AddLeadPage />} />
        <Route path="/leads/:id" element={<LeadDetailsPage />} />
        <Route path="/leads/:id/edit" element={<EditLeadPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
