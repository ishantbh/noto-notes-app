import { z } from 'zod'

export const AddEditFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Note title must be at least 3 characters.')
    .max(32, 'Note title must be at most 32 characters.'),
  content: z.string().min(3, 'Content must be at least 3 characters.'),
  tags: z.string(),
})
