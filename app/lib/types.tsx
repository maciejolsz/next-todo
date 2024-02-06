export type TaskType = {
  id: string;
  name: string;
  details: string;
  status: "new" | "in-progress" | "next" | "project" | "waiting" | "done" | "trash";
  priority: "low" | "normal" | "high";
};
