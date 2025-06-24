import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // URL에서 경로 추출
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    // public/data 디렉토리에서 파일 읽기
    const filePath = path.join(process.cwd(), 'public', 'data', `${url}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    res.status(200).json(data);
  } catch (error) {
    console.error('Mock data loading error:', error);
    res.status(500).json({ error: 'Failed to load mock data' });
  }
} 