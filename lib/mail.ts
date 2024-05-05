import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: We can style this better
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/new-password?token=${token}`
  // TODO: Style the email
  await resend.emails.send({
    from: "noreply@custom-auth.com <onboarding@resend.dev>",
    to: email,
    subject: 'Password Reset',
    html: `
    <h1>Hello from Custom Auth!</h1>
    <p>Hi! <strong> ${email}</strong>, <br>
    We received a request to reset the password for your account.</p>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Otherwise click the button below to reset your password:</p>
    <a href="${resetPasswordLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset password</a>
    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
    <p>Best regards,</p>
    <p>Custom Auth Team</p>
  `,
  });
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-email?token=${token}`
  await resend.emails.send({
    from: "noreply@custom-auth.com <onboarding@resend.dev>",
    to: email,
    subject: 'Confirm your email',
    html: `
    <h1>Welcome to Custom Auth!</h1>
    <p>Thank you for joining us, <strong> ${email}</strong>, <br>
    To get started, please verify your email address by clicking the button below:</p>
    <a href="${confirmLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a>
    <p>If you have any questions or need assistance, feel free to contact our support team.</p>
    <p>Best regards,</p>
    <p>Custom Auth Team</p>
  `,
  });
}