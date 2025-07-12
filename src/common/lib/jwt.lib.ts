import { sign, verify } from 'jsonwebtoken';

import { config } from '../../config/config';

export const signJwt = (payload: object): string => {
  try {
    const token = sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessTokenExpiresIn });
    return token;
  } catch (error) {
    throw new Error(`Failed to sign JWT: ${error}`);
  }
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    throw new Error(`Failed to verify JWT: ${error}`);
  }
};
