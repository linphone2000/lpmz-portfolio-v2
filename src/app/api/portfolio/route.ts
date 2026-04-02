import { NextResponse } from 'next/server';

import { fallbackPortfolioContent } from '@/lib/portfolio-content-shared';

export async function GET() {
  return NextResponse.json(fallbackPortfolioContent, { status: 200 });
}
