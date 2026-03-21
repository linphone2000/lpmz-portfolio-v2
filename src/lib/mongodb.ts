import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MONGO_URI is not set');
}

type GlobalWithMongo = typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const globalWithMongo = globalThis as GlobalWithMongo;

const clientPromise =
  globalWithMongo._mongoClientPromise || new MongoClient(uri).connect();

if (process.env.NODE_ENV !== 'production') {
  globalWithMongo._mongoClientPromise = clientPromise;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db('portfolio_db');
}
