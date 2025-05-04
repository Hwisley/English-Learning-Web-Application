// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

// 비디오 데이터 타입 정의
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName?: string;
  isLive?: boolean;
  publishedAt: string;
}

// 문장 데이터 타입 정의
export interface Sentence {
  time?: number;
  timestamp?: number;
  english: string;
  korean: string;
}

// 비디오 상세 정보 타입 정의
export interface VideoDetail {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  sentences: Sentence[];
}

// API 요청용 헬퍼 함수
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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

// 모든 비디오 목록 가져오기
export async function getAllVideos(): Promise<{ lvAcademy: Video[], toddler: Video[] }> {
  return fetchApi<{ lvAcademy: Video[], toddler: Video[] }>('/videos');
}

// 특정 카테고리의 비디오 목록 가져오기
export async function getVideosByCategory(category: string): Promise<Video[]> {
  return fetchApi<Video[]>(`/videos/category/${category}`);
}

// 비디오 상세 정보 가져오기
export async function getVideoById(id: string): Promise<VideoDetail> {
  return fetchApi<VideoDetail>(`/videos/${id}`);
}

// 비디오의 이중 언어 문장 목록 가져오기
export async function getVideoSentences(id: string): Promise<Sentence[]> {
  return fetchApi<Sentence[]>(`/videos/${id}/sentences`);
}

export default {
  getAllVideos,
  getVideosByCategory,
  getVideoById,
  getVideoSentences,
}; 