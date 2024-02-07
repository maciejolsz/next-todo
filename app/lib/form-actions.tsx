'use server'

import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";

export type State = {
  errors?: {
    name?: string;
    details?: string;
    status?: string;
    priority?: string;
  };
  message?: string | null;
  type?: "success" | "error";
} | null;

export default async function createTask(prevState: State, formData: FormData): Promise<State> {
  const name = (formData.get('name') || "").toString();
  const details = (formData.get('details') || "").toString();
  const priority = (formData.get('priority') || "").toString();

  try {
    await sql`
    INSERT INTO tasks (name, details, status, priority)
    VALUES (${name}, ${details}, ${"new"}, ${priority})
    `;
  } catch (err) {
    console.log('DB ERR');
    return { message: 'error', type: "error" }
  }

  revalidatePath('/workshop/tasks');

  return {message: "ok", type: "success"}
}
