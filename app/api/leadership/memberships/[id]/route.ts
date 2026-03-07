import { NextRequest } from 'next/server';
import { ProfessionalMembership } from '@/lib/models/Leadership';
import { getOne, updateOne, deleteOne } from '@/lib/apiHelpers';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return getOne(ProfessionalMembership as Parameters<typeof getOne>[0], id);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return updateOne(ProfessionalMembership as Parameters<typeof updateOne>[0], id, req);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return deleteOne(ProfessionalMembership as Parameters<typeof deleteOne>[0], id);
}
