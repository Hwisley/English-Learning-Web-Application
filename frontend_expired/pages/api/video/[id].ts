import { NextApiRequest, NextApiResponse } from 'next';

// 임시 비디오 데이터
const mockVideoData = {
  '1': {
    id: '1',
    title: 'Sample English Learning Video',
    description: 'Learn English with our sample video',
    videoUrl: 'https://www.youtube.com/watch?v=sample1',
    thumbnailUrl: 'https://i.ytimg.com/vi/sample1/hqdefault.jpg',
    publishedAt: new Date().toISOString(),
    sentences: [
      {
        time: 0,
        english: "Hello, welcome to our English lesson.",
        korean: "안녕하세요, 영어 수업에 오신 것을 환영합니다."
      },
      {
        time: 5,
        english: "Today we will learn about basic conversations.",
        korean: "오늘은 기본적인 대화에 대해 배우겠습니다."
      }
    ]
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;
  
  // id가 문자열이 아닌 경우 처리
  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid video ID' });
  }

  const videoData = mockVideoData[id];

  if (!videoData) {
    return res.status(404).json({ message: 'Video not found' });
  }

  // 1초 지연 시뮬레이션
  setTimeout(() => {
    res.status(200).json(videoData);
  }, 1000);
} 