import { z } from 'zod'

export const SignupSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(50, 'Name must be less than 50 characters'),
  email: z.email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password must contain an uppercase letter',
    )
    .refine(
      (password) => /[a-z]/.test(password),
      'Password must contain a lowercase letter',
    )
    .refine(
      (password) => /[0-9]/.test(password),
      'Password must contain a number',
    )
    .refine(
      (password) => /[!@#$%^&*]/.test(password),
      'Password must contain a special character',
    ),
})
