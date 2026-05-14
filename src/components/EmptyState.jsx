import { Inbox } from "lucide-react";

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="surface-card flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Inbox className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
