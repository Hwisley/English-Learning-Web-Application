import { NextApiRequest, NextApiResponse } from 'next';

// 임시 데이터
const mockLvAcademyVideos = [
  {
    id: 'video1',
    title: '[LIVE] Live Academy English Class',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample1/hqdefault.jpg',
    publishedAt: new Date().toISOString(),
    channelId: 'channel1',
    isLive: true
  },
  {
    id: 'video2',
    title: '[LIVE] Advanced English Lesson',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample2/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    channelId: 'channel1',
    isLive: true
  },
  {
    id: 'video3',
    title: 'English Grammar for Beginners',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample3/hqdefault.jpg',
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    channelId: 'channel1',
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

  // 실제 API 서버가 구현되면 여기서 YouTube API를 호출할 것입니다
  // 현재는 목 데이터 반환
  
  // 1초 지연 시뮬레이션 (실제 API 호출 시간 시뮬레이션)
  setTimeout(() => {
    res.status(200).json(mockLvAcademyVideos);
  }, 1000);
} 