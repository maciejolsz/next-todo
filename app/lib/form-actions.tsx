'use server'

import {z} from "zod";
import {sql} from "@vercel/postgres";
import {revalidatePath} from "next/cache";

const CreateTaskFormSchema = z.object({
  name: z.string(),
  details: z.string(),
  priority: z.enum(['low', 'normal', 'high']),
  status: z.enum(['new'])
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

export default async function createTask(prevState: State, formData: FormData): Promise<State> {
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
    const { name, details, priority } = validatedFields.data;

    await sql`
    INSERT INTO tasks (name, details, status, priority)
    VALUES (${name}, ${details}, ${"new"}, ${priority})
    `;
  } catch (err) {
    return { message: 'Failed to create Task', type: "error" }
  }

  revalidatePath('/workshop/tasks');

  return {message: "Task created successfully", type: "success"}
}
