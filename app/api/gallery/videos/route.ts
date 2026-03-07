import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryVideo } from '@/lib/models/GalleryVideo';

export async function GET() {
  try {
    await connectDB();
    const videos = await GalleryVideo.find({ active: true }).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const video = await GalleryVideo.findOneAndUpdate(
      { url: body.url },
      body,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
