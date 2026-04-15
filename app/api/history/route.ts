import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/data/db';

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.history);
}

export async function POST(request: Request) {
  const db = await readDB();
  const body = await request.json();

  const newRecord = {
    id: db.history.length > 0 ? Math.max(...db.history.map(r => r.id)) + 1 : 1,
    ...body
  };

  // Add to beginning of history
  db.history.unshift(newRecord);
  await writeDB(db);

  return NextResponse.json(newRecord, { status: 201 });
}
