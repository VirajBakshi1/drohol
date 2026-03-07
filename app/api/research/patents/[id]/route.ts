import { NextRequest } from 'next/server';
import { Patent } from '@/lib/models/Research';
import { getOne, updateOne, deleteOne } from '@/lib/apiHelpers';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return getOne(Patent as Parameters<typeof getOne>[0], id);
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = await params;
  return updateOne(Patent as Parameters<typeof updateOne>[0], id, req);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  return deleteOne(Patent as Parameters<typeof deleteOne>[0], id);
}
