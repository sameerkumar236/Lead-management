import { Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const routeTitles = {
  "/dashboard": "Dashboard",
  "/leads": "Lead Listing",
  "/leads/new": "Add Lead"
};

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    if (routeTitles[location.pathname]) return routeTitles[location.pathname];
    if (location.pathname.includes("/edit")) return "Edit Lead";
    if (location.pathname.startsWith("/leads/")) return "Lead Details";
    return "LeadFlow CRM";
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">LeadFlow CRM</p>
                <h1 className="text-base font-bold text-slate-950 sm:text-lg">{title}</h1>
              </div>
            </div>
            <div className="hidden rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 sm:block">
              Sales workspace
            </div>
          </div>
        </header>

        <main className="page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
