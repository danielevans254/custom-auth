import { createHash } from "crypto"

export const hashWithSalt = (password: string, salt: string): string => {
  const hash = createHash("sha256")
  hash.update(password + salt.toLowerCase())
  return hash.digest("hex")
}
