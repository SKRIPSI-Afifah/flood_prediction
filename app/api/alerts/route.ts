import { NextResponse } from 'next/server';
import { readDB } from '@/lib/data/db';

export async function GET() {
  const db = await readDB();
  return NextResponse.json(db.alerts);
}
