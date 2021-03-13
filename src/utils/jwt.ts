import Jwt from 'jsonwebtoken';

const secret = 'hashsecretaa';

// Cria um token que será válido durante 24hs.
export const sign = (payload: any) => Jwt.sign(payload, secret, { expiresIn: 86400 });

export const verify = (token: any) => Jwt.verify(token, secret);
