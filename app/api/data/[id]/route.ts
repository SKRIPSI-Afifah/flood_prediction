import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/data/db';

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);
  const body = await request.json();
  const db = await readDB();

  const index = db.regions.findIndex(r => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.regions[index] = { ...db.regions[index], ...body };
  await writeDB(db);

  return NextResponse.json(db.regions[index]);
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const id = parseInt(params.id);
  const db = await readDB();

  const index = db.regions.findIndex(r => r.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  db.regions.splice(index, 1);
  await writeDB(db);

  return NextResponse.json({ success: true });
}
