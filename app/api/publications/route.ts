import { NextRequest } from 'next/server';
import { Publication } from '@/lib/models/Publication';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type');
  const query = type ? { type } : {};
  return getAll(Publication as Parameters<typeof getAll>[0], query);
}

export async function POST(req: NextRequest) {
  return createOne(Publication as Parameters<typeof createOne>[0], req);
}
