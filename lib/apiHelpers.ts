import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import type { Model } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MongoModel = Model<any>;

/** GET all documents from a collection, sorted by `order` asc */
export async function getAll(Model: MongoModel, query: Record<string, unknown> = {}) {
  await connectDB();
  const docs = await (Model as MongoModel).find(query).sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json(docs);
}

/** POST – create a new document */
export async function createOne(Model: MongoModel, req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const doc = await Model.create(body);
  return NextResponse.json(doc, { status: 201 });
}

/** GET by id */
export async function getOne(Model: MongoModel, id: string) {
  await connectDB();
  const doc = await Model.findById(id).lean();
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

/** PUT – full/partial update */
export async function updateOne(Model: MongoModel, id: string, req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const doc = await Model.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(doc);
}

/** DELETE by id */
export async function deleteOne(Model: MongoModel, id: string) {
  await connectDB();
  const doc = await Model.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted successfully' });
}
