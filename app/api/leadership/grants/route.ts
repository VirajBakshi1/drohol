import { NextRequest } from 'next/server';
import { Grant } from '@/lib/models/Leadership';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(Grant as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(Grant as Parameters<typeof createOne>[0], req);
}
