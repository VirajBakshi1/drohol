import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { HeroSlide } from '@/lib/models/HeroSlide';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const slide = await HeroSlide.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(slide);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const slide = await HeroSlide.findByIdAndDelete(id);
  if (!slide) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted' });
}
