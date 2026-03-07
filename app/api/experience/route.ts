import { NextRequest } from 'next/server';
import { Experience } from '@/lib/models/Leadership';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');
  const query = type ? { type } : {};
  return getAll(Experience as Parameters<typeof getAll>[0], query);
}

export async function POST(req: NextRequest) {
  return createOne(Experience as Parameters<typeof createOne>[0], req);
}
