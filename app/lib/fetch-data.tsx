import {unstable_noStore as noStore} from "next/cache";
import {sql} from "@vercel/postgres";
import {TaskType} from "@/app/lib/types";

export async function fetchTasks() {
  noStore();
  try {
    const tasks = await sql<TaskType>`
      SELECT * FROM tasks
      ORDER BY id
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}
