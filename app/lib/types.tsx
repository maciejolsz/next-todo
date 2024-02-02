export type TodoType = {
  id: string;
  name: string;
  details: string;
  status: "new" | "in-progress" | "next" | "project" | "waiting" | "done" | "trash";
  priority: "low" | "normal" | "high";
};
