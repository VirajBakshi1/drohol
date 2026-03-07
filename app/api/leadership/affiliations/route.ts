import { NextRequest } from 'next/server';
import { PresentAffiliation } from '@/lib/models/Leadership';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(PresentAffiliation as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(PresentAffiliation as Parameters<typeof createOne>[0], req);
}
