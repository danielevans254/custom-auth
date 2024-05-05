import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/utils/db';

export const generatePasswordResetToken = async (email: string): Promise<any> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);
  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    if (existingToken.expires < new Date()) {
      return generatePasswordResetToken(email);
    }
    return existingToken;
  }

  const passwordResetToken = await db.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    }
  });
  return passwordResetToken;
}



