import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { PersonalInfo } from '@/lib/models/PersonalInfo';

export async function GET() {
  await connectDB();
  let doc = await PersonalInfo.findOne().lean();
  return NextResponse.json(doc || {});
}

export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const doc = await PersonalInfo.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  return NextResponse.json(doc);
}
