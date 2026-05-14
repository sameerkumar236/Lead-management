import { BarChart3, Home, LayoutDashboard, PlusCircle, Users, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Add Lead", href: "/leads/new", icon: PlusCircle },
  { name: "Home", href: "/", icon: Home }
];

const SidebarContent = ({ onClose }) => (
  <div className="flex h-full flex-col bg-slate-950 px-4 py-5 text-white">
    <div className="flex items-center justify-between">
      <Link to="/dashboard" className="flex items-center gap-3" onClick={onClose}>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-500">
          <BarChart3 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-lg font-bold">LeadFlow CRM</span>
      </Link>
      {onClose ? (
        <button
          type="button"
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
    </div>

    <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">Pipeline</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">Revenue teams can keep every lead moving.</p>
    </div>

    <nav className="mt-8 flex flex-1 flex-col gap-1">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={onClose}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition",
              isActive ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/10 hover:text-white"
            ].join(" ")
          }
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          {item.name}
        </NavLink>
      ))}
    </nav>

    <div className="rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 p-4">
      <p className="text-sm font-semibold">Conversion focus</p>
      <p className="mt-2 text-sm leading-6 text-blue-50">Prioritize warm accounts and track the next move.</p>
    </div>
  </div>
);

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 lg:block">
        <SidebarContent />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/50"
            onClick={onClose}
            aria-label="Close sidebar overlay"
          />
          <aside className="relative h-full w-80 max-w-[86vw] shadow-2xl">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
