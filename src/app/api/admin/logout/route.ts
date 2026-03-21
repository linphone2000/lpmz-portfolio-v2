import { NextResponse } from 'next/server';

import { clearSessionCookie } from '@/lib/admin-auth';

export async function POST() {
  const response = NextResponse.json({ ok: true }, { status: 200 });
  clearSessionCookie(response);
  return response;
}
