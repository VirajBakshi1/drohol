import { NextRequest } from 'next/server';
import { Award } from '@/lib/models/Award';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  const query = category ? { category } : {};
  return getAll(Award as Parameters<typeof getAll>[0], query);
}

export async function POST(req: NextRequest) {
  return createOne(Award as Parameters<typeof createOne>[0], req);
}
