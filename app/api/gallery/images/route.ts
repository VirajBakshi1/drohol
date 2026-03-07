import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImage } from '@/lib/models/GalleryImage';

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find({ active: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const image = await GalleryImage.findOneAndUpdate(
      { url: body.url },
      body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
