import { NextRequest, NextResponse } from 'next/server';

import { issueSessionToken, setSessionCookie } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'ADMIN_EMAIL or ADMIN_PASSWORD is not configured' },
        { status: 500 }
      );
    }

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (body.email !== adminEmail || body.password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = issueSessionToken(body.email);
    const response = NextResponse.json({ ok: true }, { status: 200 });
    setSessionCookie(response, token);

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: `Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
