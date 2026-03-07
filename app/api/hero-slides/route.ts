import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { HeroSlide } from '@/lib/models/HeroSlide';

export async function GET() {
  await connectDB();
  const slides = await HeroSlide.find({ active: true }).sort({ order: 1 }).lean();
  return NextResponse.json(slides);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const slide = await HeroSlide.create(body);
  return NextResponse.json(slide, { status: 201 });
}
