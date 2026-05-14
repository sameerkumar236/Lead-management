import { Activity, CheckCircle2, Clock3, Target, Users } from "lucide-react";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import LoadingSpinner from "../components/LoadingSpinner";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { useLeads } from "../store/useLeads";
import { formatDate, formatPercent } from "../utils/formatters";
import { statusChartColors } from "../utils/status";

const DashboardPage = () => {
  const { stats, fetchStats, isLoading, error } = useLeads();

  useEffect(() => {
    void fetchStats().catch(() => undefined);
  }, [fetchStats]);

  if (isLoading && !stats) {
    return <LoadingSpinner label="Loading dashboard" />;
  }

  const statusData = stats
    ? [
        { name: "New", value: stats.newLeads, fill: statusChartColors.New },
        { name: "In Progress", value: stats.inProgressLeads, fill: statusChartColors["In Progress"] },
        { name: "Converted", value: stats.convertedLeads, fill: statusChartColors.Converted }
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-blue-600">Pipeline overview</p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">Dashboard</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Track lead volume, sales motion, and conversion health from one analytics view.
          </p>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Leads"
          value={stats?.totalLeads ?? 0}
          description="All captured opportunities"
          icon={Users}
          tone="blue"
        />
        <StatCard
          title="New Leads"
          value={stats?.newLeads ?? 0}
          description="Awaiting first touch"
          icon={Target}
          tone="blue"
        />
        <StatCard
          title="In Progress"
          value={stats?.inProgressLeads ?? 0}
          description="Actively moving forward"
          icon={Clock3}
          tone="orange"
        />
        <StatCard
          title="Converted"
          value={stats?.convertedLeads ?? 0}
          description="Closed as customers"
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          title="Conversion Rate"
          value={formatPercent(stats?.conversionRate ?? 0)}
          description="Converted from total leads"
          icon={Activity}
          tone="violet"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="surface-card p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Status Overview</h3>
              <p className="mt-1 text-sm text-slate-500">Lead distribution by pipeline stage.</p>
            </div>
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 30px -20px rgba(15,23,42,.35)"
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={52}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="surface-card p-5">
          <h3 className="text-lg font-semibold text-slate-950">Lead Sources</h3>
          <p className="mt-1 text-sm text-slate-500">Where demand is entering the funnel.</p>
          <div className="mt-6 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.sourceBreakdown ?? []}
                  dataKey="count"
                  nameKey="_id"
                  innerRadius={58}
                  outerRadius={88}
                  paddingAngle={4}
                >
                  {(stats?.sourceBreakdown ?? []).map((entry, index) => (
                    <Cell
                      key={entry._id}
                      fill={["#2563eb", "#16a34a", "#f97316", "#7c3aed", "#0f766e"][index % 5]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 10px 30px -20px rgba(15,23,42,.35)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid gap-2">
            {(stats?.sourceBreakdown ?? []).map((source) => (
              <div key={source._id} className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">{source._id}</span>
                <span className="font-semibold text-slate-950">{source.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-950">Recent Leads</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {(stats?.recentLeads ?? []).map((lead) => (
            <div key={lead._id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
              <div>
                <p className="font-semibold text-slate-950">{lead.name}</p>
                <p className="text-sm text-slate-500">{lead.company}</p>
              </div>
              <StatusBadge status={lead.status} />
              <span className="text-sm font-medium text-slate-500">{formatDate(lead.createdAt)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
