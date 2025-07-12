import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_ACCESS_TOKEN_EXPIRE = parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRE as string);

export const signJwt = (payload: object): string => {
  try {
    const token = sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRE });
    return token;
  } catch (error) {
    throw new Error(`Failed to sign JWT: ${error}`);
  }
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(`Failed to verify JWT: ${error}`);
  }
};
