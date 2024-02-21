export type TaskType = {
  id: string;
  name: string;
  details: string;
  status: TaskStatusType;
  priority: "low" | "normal" | "high";
  created_at: Date;
};

export type TaskStatusType = "new" | "next" | "on-it" | "project" | "blocked" | "done";
