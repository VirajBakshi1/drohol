import { NextRequest } from 'next/server';
import { StudentProject } from '@/lib/models/Student';
import { getAll, createOne } from '@/lib/apiHelpers';

export async function GET() {
  return getAll(StudentProject as Parameters<typeof getAll>[0]);
}

export async function POST(req: NextRequest) {
  return createOne(StudentProject as Parameters<typeof createOne>[0], req);
}
