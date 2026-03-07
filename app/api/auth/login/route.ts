import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminConfig } from '@/lib/models/AdminConfig';
import { createToken, hashPassword, verifyPassword, COOKIE_NAME } from '@/lib/auth';

async function ensureAdminConfig() {
  const existing = await AdminConfig.findOne({});
  if (existing) return existing;

  const email = process.env.ADMIN_EMAIL || 'admin@drohol.in';
  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const pin = process.env.ADMIN_SECRET_PIN || '0000';

  const { hash: passwordHash, salt: passwordSalt } = await hashPassword(password);
  const { hash: pinHash, salt: pinSalt } = await hashPassword(pin);

  return AdminConfig.create({ email, passwordHash, passwordSalt, pinHash, pinSalt });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const config = await ensureAdminConfig();

    const emailMatch = email.trim().toLowerCase() === config.email.toLowerCase();
    const passwordMatch = await verifyPassword(password, config.passwordHash, config.passwordSalt);

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await createToken(config.email);

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 8 * 60 * 60,
      path: '/',
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
