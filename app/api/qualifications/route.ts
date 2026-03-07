import { NextRequest } from 'next/server';
import { Qualification } from '@/lib/models/Leadership';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(Qualification as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(Qualification as Parameters<typeof createOne>[0], req);
}
