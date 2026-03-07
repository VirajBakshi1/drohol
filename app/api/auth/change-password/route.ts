import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { AdminConfig } from '@/lib/models/AdminConfig';
import { hashPassword, verifyPassword, COOKIE_NAME, verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const verified = token ? await verifyToken(token) : null;
    if (!verified) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    await connectDB();
    const { pin, newPassword, confirmPassword } = await req.json();

    if (!pin || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const config = await AdminConfig.findOne({});
    if (!config) return NextResponse.json({ error: 'Admin config not found.' }, { status: 404 });

    const pinValid = await verifyPassword(String(pin), config.pinHash, config.pinSalt);
    if (!pinValid) return NextResponse.json({ error: 'Incorrect secret PIN.' }, { status: 401 });

    const { hash: passwordHash, salt: passwordSalt } = await hashPassword(newPassword);
    await AdminConfig.findByIdAndUpdate(config._id, { passwordHash, passwordSalt });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
