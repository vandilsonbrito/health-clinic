import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '../firebaseAdmin';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ message: 'Authorization token not provided' }, { status: 401 });
  }

  try {
    const decodedToken = await verifyIdToken(token);
    return NextResponse.json({ message: 'Token is valid', user: decodedToken }, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
