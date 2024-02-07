import {unstable_noStore as noStore} from "next/cache";
import {sql} from "@vercel/postgres";
import {TaskType} from "@/app/lib/types";

export async function fetchTasks() {
  noStore();
  try {
    const tasks = await sql<TaskType>`
      SELECT * FROM tasks
      ORDER BY created_at DESC
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}
