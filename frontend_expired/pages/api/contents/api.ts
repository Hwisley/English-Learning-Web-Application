import { NextApiRequest, NextApiResponse } from 'next';
import { Video } from '../../../types/video';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 쿼리 파라미터 확인
  const { sourceType } = req.query;

  // 'lv-academy' 요청 처리
  if (sourceType === 'lv-academy') {
    const lvAcademyVideos: Video[] = [
      {
        videoID: "1",
        channelID: "channel1",
        title: "영어 회화 기초 강의",
        description: "기초 영어 회화를 배워보세요",
        thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
        publishedAt: "2024-03-20"
      },
      {
        videoID: "2",
        channelID: "channel1",
        title: "영어 회화 기초 강의 2",
        description: "기초 영어 회화를 배워보세요",
        thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
        publishedAt: "2024-03-20"
      },
      {
        videoID: "3",
        channelID: "channel1",
        title: "영어 회화 기초 강의 3 ",
        description: "기초 영어 회화를 배워보세요",
        thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
        publishedAt: "2024-03-20"
      },
      {
        videoID: "4",
        channelID: "channel1",
        title: "영어 회화 기초 강의 4",
        description: "기초 영어 회화를 배워보세요",
        thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
        publishedAt: "2024-03-20"
      },
    ];

    // 응답 전송
    res.status(200).json(lvAcademyVideos);
    return;
  }

  // 지원하지 않는 소스 타입인 경우 오류 반환
  res.status(400).json({ error: '지원하지 않는 소스 타입입니다.' });
} 