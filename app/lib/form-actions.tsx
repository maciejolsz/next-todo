'use server'

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";

const CreateTaskFormSchema = z.object({
  name: z.string(),
  details: z.string(),
  priority: z.enum(['low', 'normal', 'high']),
  status: z.enum(["new", "in-progress", "next", "project", "waiting", "done", "trash"])
});

export type State = {
  errors?: {
    name?: string[];
    details?: string[];
    status?: string[];
    priority?: string[];
  };
  message?: string | null;
  type?: "success" | "error";
} | null;

export async function createTask(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateTaskFormSchema.safeParse({
    name: formData.get('name'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    status: "new"
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Form is invalid.'
    }
  }

  try {
    const { name, details, priority, status } = validatedFields.data;

    await sql`
    INSERT INTO tasks (name, details, status, priority)
    VALUES (${name}, ${details}, ${status}, ${priority})
    `;
  } catch (err) {
    console.log('err:', err)
    return { message: 'Failed to create Task', type: "error" }
  }

  revalidatePath('/workshop/tasks');

  return {message: "Task created successfully", type: "success"}
}

export async function editTask(taskId: string, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateTaskFormSchema.safeParse({
    name: formData.get('name'),
    details: formData.get('details'),
    priority: formData.get('priority'),
    status: formData.get('status')
  })

  if (!validatedFields.success) {
    console.log('validatedFields', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Form is invalid.'
    }
  }

  try {
    const { name, details, priority, status } = validatedFields.data;

    await sql`
      UPDATE tasks
      SET name = ${name}, details = ${details}, status = ${status}, priority = ${priority}
      WHERE id = ${taskId}
    `
  } catch (err) {
    console.log('err', err);
    return { message: 'Failed to update Task', type: "error" }
  }

  revalidatePath('/workshop/tasks');

  return {message: "Task updated successfully", type: "success"}
}

export async function deleteTask(taskId: string): Promise<State> {
  try {
    await sql`
      DELETE FROM tasks WHERE id = ${taskId}
    `
  } catch (err) {
    console.log('err', err);
    return { message: 'Failed to update Task', type: "error" }
  }

  revalidatePath('/workshop/tasks');

  return {message: "Task updated successfully", type: "success"}
}
