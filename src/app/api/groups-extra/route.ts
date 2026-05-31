import { NextResponse } from 'next/server';
import groupsExtra from '@/data/groups-extra.json';

export async function GET() {
  return NextResponse.json(groupsExtra);
}
