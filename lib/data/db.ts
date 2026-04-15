/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs/promises';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'lib', 'data', 'db.json');

export interface Database {
  regions: any[];
  history: any[];
  alerts: any[];
}

export async function readDB(): Promise<Database> {
  try {
    const data = await fs.readFile(dbFilePath, 'utf-8');
    return JSON.parse(data) as Database;
  } catch (error) {
    console.error("Error reading db:", error);
    return { regions: [], history: [], alerts: [] };
  }
}

export async function writeDB(data: Database): Promise<void> {
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing db:", error);
  }
}
