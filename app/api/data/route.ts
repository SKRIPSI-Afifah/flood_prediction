import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/data/db';

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.regions);
}

export async function POST(request: Request) {
  const db = await readDB();
  const body = await request.json();

  const newRegion = {
    id: db.regions.length > 0 ? Math.max(...db.regions.map(r => r.id)) + 1 : 1,
    ...body
  };

  db.regions.push(newRegion);
  await writeDB(db);

  return NextResponse.json(newRegion, { status: 201 });
}
