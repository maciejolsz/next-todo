import { unstable_noStore as noStore } from "next/cache";

import { sql } from "@vercel/postgres";

import { MusicThemeType, TaskType } from "@/app/lib/types";
import { UniqueIdentifier } from "@dnd-kit/core";

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

export async function fetchTask(id: UniqueIdentifier) {
  noStore();
  try {
    const task = await sql<TaskType>`
      SELECT * FROM tasks
      WHERE ID = ${id}
    `;

    return task.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchMusicThemes() {
  noStore();
  try {
    const themes = await sql<MusicThemeType>`
      SELECT * FROM music_themes
    `;

    return themes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch themes.');
  }
}
