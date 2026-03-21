import { NextResponse } from 'next/server';

import {
  fallbackPortfolioContent,
  type PortfolioCMSData,
} from '@/lib/portfolio-content-shared';
import { getDb } from '@/lib/mongodb';

type PortfolioDocument = PortfolioCMSData & {
  key: 'main';
  updatedAt: string;
};

export async function GET() {
  try {
    const db = await getDb();
    const doc = await db
      .collection<PortfolioDocument>('portfolio_content')
      .findOne({
        key: 'main',
      });

    if (!doc) {
      return NextResponse.json(fallbackPortfolioContent, { status: 200 });
    }

    const content = {
      about: doc.about,
      experience: doc.experience,
      projects: doc.projects,
      skills: doc.skills,
      education: doc.education,
      certs: doc.certs,
      achievements: doc.achievements,
      services: doc.services,
      pricing: doc.pricing,
      estimateFeatures: doc.estimateFeatures,
    };
    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Unable to load portfolio content: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    );
  }
}
