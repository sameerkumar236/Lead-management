import { ArrowRight, BarChart3 } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-20 border-b border-white/15 bg-white/10 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base font-bold">LeadFlow CRM</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-semibold text-white/80 md:flex">
          <a href="#platform" className="transition hover:text-white">
            Platform
          </a>
          <a href="#insights" className="transition hover:text-white">
            Insights
          </a>
          <NavLink to="/leads" className="transition hover:text-white">
            Leads
          </NavLink>
        </div>

        <Link to="/dashboard" className="btn-secondary border-white/20 bg-white/95 text-slate-950">
          Open app
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
