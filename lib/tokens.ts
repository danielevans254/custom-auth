import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/utils/db';

// FIXME: There is an error here, that is causing this to take longer than expected, is it the checking if its expired?
export const generateVerificationToken = async (email: string): Promise<any> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    if (existingToken.expires < new Date()) {
      return generateVerificationToken(email);
    } else {
      return existingToken;
    }
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });
  return verificationToken;
}



