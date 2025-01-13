export const statusClasses = {
  absent: "bg-slate-400 text-white",
  correct: "bg-lime-600 text-white",
  present: "bg-yellow-500 text-white",
  default: "bg-white-200" // Default empty cell
}

export type CharStatus = "absent" | "present" | "correct";