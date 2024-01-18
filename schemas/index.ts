import * as z from 'zod';


export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(1, {
    message: 'Please enter a password'
  })
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string()
});