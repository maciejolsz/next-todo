import {unstable_noStore as noStore} from "next/cache";
import {sql} from "@vercel/postgres";
import {TodoType} from "@/app/lib/types";

export async function fetchTodos() {
  noStore();
  try {
    const todos = await sql<TodoType>`
      SELECT * FROM todos
      ORDER BY id
    `;

    return todos.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch todos.');
  }
}
