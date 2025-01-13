import { statusClasses, CharStatus } from "../shared/types";

interface Key {
  status: CharStatus;
  value: string;
}

export const Key = ({
  status,
  value,
}: Key) => {

  const statusClass = statusClasses[status || "default"];

  return (
    <div
      className={`flex items-center justify-center rounded w-14 h-14 mx-0.5 px-2 border-slate-200 border-2 text-xs font-bold cursor-pointer ${statusClass}`}
    >
      { value}
    </div>
  );
};