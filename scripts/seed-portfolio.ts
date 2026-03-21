import 'dotenv/config';

import { MongoClient } from 'mongodb';

import { fallbackPortfolioContent } from '../src/lib/portfolio-content-shared';

async function run() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not set');
  }

  const client = await new MongoClient(uri).connect();
  const db = client.db('portfolio_db');

  await db.collection('portfolio_content').updateOne(
    { key: 'main' },
    {
      $set: {
        ...fallbackPortfolioContent,
        key: 'main',
        updatedAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  console.log('Upserted portfolio_content:main');
  await client.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
