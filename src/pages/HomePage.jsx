import { ArrowRight, CheckCircle2, LineChart, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImage from "../assets/leadflow-hero.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <section className="relative flex min-h-[82svh] items-center overflow-hidden">
        <img
          src={heroImage}
          alt="LeadFlow CRM analytics dashboard preview"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-blue-50 backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Premium lead operations
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-normal text-white sm:text-6xl lg:text-7xl">
              LeadFlow CRM
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100 sm:text-xl">
              Capture, qualify, and convert leads from one polished revenue workspace built for focused
              sales teams.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dashboard" className="btn-primary px-5 py-3">
                View Dashboard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/leads/new" className="btn-secondary border-white/20 bg-white/95 px-5 py-3">
                Add Lead
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { label: "Lead visibility", value: "360°", icon: Users },
            { label: "Status momentum", value: "3 stages", icon: LineChart },
            { label: "Deployment path", value: "Cloud-ready", icon: ShieldCheck }
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <item.icon className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <p className="mt-4 text-2xl font-bold text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="insights" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase text-blue-600">Built for assessment</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              A complete SaaS CRM surface, from API to analytics.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "RESTful Express API with MongoDB persistence",
              "Responsive React dashboard with reusable components",
              "Seeded demo pipeline, charts, filters, and CRUD workflows"
            ].map((feature) => (
              <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
