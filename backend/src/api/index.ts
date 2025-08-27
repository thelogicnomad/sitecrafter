/* Vercel serverless entrypoint */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../app';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Express app signature matches
  // @ts-ignore
  return app(req, res);
}
