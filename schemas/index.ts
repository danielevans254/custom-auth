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
  email: z.string().email({
    message: 'Please enter a valid email'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long'
  }),
  name: z.string().min(1, {
    message: 'Please enter your name'
  })
});

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email'
  })
});

// TODO: We can add a confirmation password field here, add a check to ensure they match
// TODO: It doesn't show the error message when the passwords don't match, but it doesn't allow the user to submit the form which is correct
export const SetNewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long'
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

// SetNewPasswordSchema.parse({ password: "asdf", confirm: "qwer" });