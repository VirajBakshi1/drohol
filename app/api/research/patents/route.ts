import { NextRequest } from 'next/server';
import { Patent } from '@/lib/models/Research';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status');
  const query = status ? { status } : {};
  return getAll(Patent as Parameters<typeof getAll>[0], query);
}

export async function POST(req: NextRequest) {
  return createOne(Patent as Parameters<typeof createOne>[0], req);
}
