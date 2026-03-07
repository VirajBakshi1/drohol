import { NextRequest } from 'next/server';
import { CompetitionMentorship } from '@/lib/models/Student';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(CompetitionMentorship as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(CompetitionMentorship as Parameters<typeof createOne>[0], req);
}
