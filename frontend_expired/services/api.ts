import { Video } from '../types/video';

// API 기본 URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA;

// 로컬 api data 경로 mapper
function getLocalApiPath(endpoint: string) {
  //todo
  return `${API_BASE_URL}${endpoint}`;
}

async function getLocalApiData(apiUrl: string) {
  // 예: "/api/contents?sourceType=lv-academy"
  const [apiPath, fileName] = apiUrl.split('?');
  const folder = apiPath.replace('/api/', '').replace(/\/$/, '');
  const filePath = `/data/${folder}/${fileName}.json`;

  // SSR 환경이면 절대경로로 fetch
  const isServer = typeof window === 'undefined';
  let url = filePath;
  if (isServer) {
    // 개발환경/운영환경 구분
    const isDev = process.env.NODE_ENV === 'development';
    const host = isDev ? 'http://localhost:3000' : 'http://222.108.148.221:3000';
    url = `${host}${filePath}`;
  }

  const response = await fetch(url);
  return response;
}

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
export async function getContents(apiUrl: string) {
  if (USE_MOCK_DATA === 'true') {
    return await getLocalApiData(apiUrl);
  }
  return fetchApi<Video[]>(`${apiUrl}`);
}

export default {
  getContents,
};