import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyIdToken } from './firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not provided' });
  }

  try {
    const decodedToken = await verifyIdToken(token);
    res.status(200).json({ message: 'Token is valid', user: decodedToken });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
