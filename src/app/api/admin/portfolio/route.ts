import { NextRequest, NextResponse } from 'next/server';

import {
  fallbackPortfolioContent,
  type PortfolioCMSData,
} from '@/lib/portfolio-content-shared';
import { getSessionFromRequest } from '@/lib/admin-auth';
import { getDb } from '@/lib/mongodb';

type PortfolioDocument = PortfolioCMSData & {
  key: 'main';
  updatedAt: string;
};

export async function PUT(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = (await request.json()) as Partial<PortfolioCMSData>;
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const nextContent: PortfolioCMSData = {
      about: payload.about || fallbackPortfolioContent.about,
      experience: payload.experience || fallbackPortfolioContent.experience,
      projects: payload.projects || fallbackPortfolioContent.projects,
      skills: payload.skills || fallbackPortfolioContent.skills,
      education: payload.education || fallbackPortfolioContent.education,
      certs: payload.certs || fallbackPortfolioContent.certs,
      achievements:
        payload.achievements || fallbackPortfolioContent.achievements,
      services: payload.services || fallbackPortfolioContent.services,
      pricing: payload.pricing || fallbackPortfolioContent.pricing,
      estimateFeatures:
        payload.estimateFeatures || fallbackPortfolioContent.estimateFeatures,
    };

    const db = await getDb();
    await db.collection<PortfolioDocument>('portfolio_content').updateOne(
      { key: 'main' },
      {
        $set: {
          ...nextContent,
          key: 'main',
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Failed to update content: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
