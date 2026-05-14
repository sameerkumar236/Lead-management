const toneStyles = {
  blue: "bg-blue-50 text-blue-700",
  orange: "bg-orange-50 text-orange-700",
  green: "bg-emerald-50 text-emerald-700",
  violet: "bg-violet-50 text-violet-700"
};

const StatCard = ({ title, value, description, icon: Icon, tone = "blue" }) => {
  return (
    <article className="surface-card p-5 transition hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-normal text-slate-950">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneStyles[tone]}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-500">{description}</p>
    </article>
  );
};

export default StatCard;
