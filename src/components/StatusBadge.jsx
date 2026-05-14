import { statusStyles } from "../utils/status";

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
