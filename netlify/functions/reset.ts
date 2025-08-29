import type { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const STORE_NAME = 'app-reset';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const store = getStore(STORE_NAME);
  const key = 'reset-version';
  const current = (await store.get(key, { type: 'text' })) || '0';
  const next = String(Number(current) + 1);
  await store.set(key, next);
  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ version: next }),
  };
};