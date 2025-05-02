import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { source_type } = req.query;

  try {
    let response;
    
    switch (source_type) {
      case 'lv-academy':
        response = await fetch('http://localhost:3000/api/youtube/lv-academy');
        break;
      case 'toddler':
        response = await fetch('http://localhost:3000/api/youtube/toddler');
        break;
      case 'news':
        response = await fetch('http://localhost:3000/api/news');
        break;
      default:
        return res.status(400).json({ error: '유효하지 않은 source_type입니다.' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: '데이터를 가져오는 중 오류가 발생했습니다.' });
  }
} 