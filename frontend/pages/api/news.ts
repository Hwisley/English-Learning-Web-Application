import { NextApiRequest, NextApiResponse } from 'next';

// 임시 뉴스 데이터
const mockNewsArticles = [
  {
    id: 'news1',
    title: 'CNN: Global Economy Faces New Challenges',
    link: 'https://example.com/news1',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'news2',
    title: 'Breaking: Technology Trends of 2023',
    link: 'https://example.com/news2',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'news3',
    title: 'Sports Report: Major League Updates',
    link: 'https://example.com/news3',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'news4',
    title: 'Science: New Discoveries in Space Exploration',
    link: 'https://example.com/news4',
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'news5',
    title: 'Health: Nutrition Guidelines Updated',
    link: 'https://example.com/news5',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // HTTP 메소드 체크
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 1초 지연 시뮬레이션 (실제 API 호출 시간 시뮬레이션)
  setTimeout(() => {
    res.status(200).json(mockNewsArticles);
  }, 1000);
} 