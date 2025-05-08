import { Video } from '../types/video';

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA;

// API 요청용 헬퍼 함수
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // 실제 API 호출
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'API 요청 실패');
  }

  return response.json();
}

// 컨텐츠 목록 가져오기
export function getContents(apiUrl: string) {
  if (USE_MOCK_DATA === 'true') {
    // 모의 데이터 직접 반환
    return [
      {
        videoID: "1",
        channelID: "channel1",
        title: "영어 회화 기초 강의",
        description: "기초 영어 회화를 배워보세요",
        thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
        publishedAt: "2024-03-20"
      }
    ];
  }
  return fetchApi<Video[]>(`${apiUrl}`);
}

export default {
  getContents,
};
