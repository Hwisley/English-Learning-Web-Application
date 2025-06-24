import { NextApiRequest, NextApiResponse } from 'next';

// 임시 데이터
const mockToddlerVideos = [
  {
    id: 'video4',
    title: '[LIVE] Toddler English Class',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample4/hqdefault.jpg',
    publishedAt: new Date().toISOString(),
    channelId: 'channel2',
    isLive: true
  },
  {
    id: 'video5',
    title: 'English Songs for Kids',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample5/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    channelId: 'channel2',
    isLive: false
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
    res.status(200).json(mockToddlerVideos);
  }, 1000);
} 