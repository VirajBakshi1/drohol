import { NextRequest } from 'next/server';
import { StudentAchievement } from '@/lib/models/Student';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(StudentAchievement as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(StudentAchievement as Parameters<typeof createOne>[0], req);
}
