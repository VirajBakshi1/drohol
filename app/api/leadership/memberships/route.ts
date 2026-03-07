import { NextRequest } from 'next/server';
import { ProfessionalMembership } from '@/lib/models/Leadership';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(ProfessionalMembership as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(ProfessionalMembership as Parameters<typeof createOne>[0], req);
}
