import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main_Page from '../../pages/contents';
import '@testing-library/jest-dom';

// 모의 데이터 정의
const mockLvAcademyData = [
  {
    id: 'video1',
    title: '[LIVE] Live Academy English Class',
    thumbnailUrl: 'https://example.com/thumbnail1.jpg',
    publishedAt: new Date().toISOString(),
    channelId: 'channel1',
    isLive: true
  },
  {
    id: 'video2',
    title: '[LIVE] Advanced English Lesson',
    thumbnailUrl: 'https://example.com/thumbnail2.jpg',
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    channelId: 'channel1',
    isLive: true
  }
];

const mockToddlerData = [
  {
    id: 'video3',
    title: '[LIVE] Toddler English Class',
    thumbnailUrl: 'https://example.com/thumbnail3.jpg',
    publishedAt: new Date().toISOString(),
    channelId: 'channel2',
    isLive: true
  }
];

const mockNewsData = [
  {
    id: 'news1',
    title: 'Latest CNN News: Global Economy',
    link: 'https://example.com/news1',
    publishedAt: new Date().toISOString()
  },
  {
    id: 'news2',
    title: 'Breaking News: Technology Trends',
    link: 'https://example.com/news2',
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// fetch API 모킹
global.fetch = jest.fn((url) => {
  return Promise.resolve({
    json: () => {
      if (url.includes('/api/youtube/lv-academy')) {
        return Promise.resolve(mockLvAcademyData);
      } else if (url.includes('/api/youtube/toddler')) {
        return Promise.resolve(mockToddlerData);
      } else if (url.includes('/api/news')) {
        return Promise.resolve(mockNewsData);
      }
      return Promise.resolve([]);
    }
  } as Response);
});

describe('Main_Page Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<Main_Page />);
    expect(screen.getByRole('status')).toBeInTheDocument(); // 로딩 스피너 체크
  });

  test('renders Live Academy section with videos', async () => {
    render(<Main_Page />);
    
    // 데이터가 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('Live Academy - 라이브 스트리밍')).toBeInTheDocument();
    });

    // 각 비디오 타이틀이 렌더링되었는지 확인
    expect(screen.getByText('[LIVE] Live Academy English Class')).toBeInTheDocument();
    expect(screen.getByText('[LIVE] Advanced English Lesson')).toBeInTheDocument();
    
    // LIVE 태그가 표시되는지 확인
    const liveTags = screen.getAllByText('LIVE');
    expect(liveTags.length).toBeGreaterThanOrEqual(2);
    
    // New 태그가 표시되는지 확인 (최근 7일 내 콘텐츠)
    expect(screen.getAllByText('New').length).toBeGreaterThanOrEqual(1);
  });

  test('renders Toddler section with videos', async () => {
    render(<Main_Page />);
    
    await waitFor(() => {
      expect(screen.getByText('Live Academy Toddler - 라이브 스트리밍')).toBeInTheDocument();
    });

    expect(screen.getByText('[LIVE] Toddler English Class')).toBeInTheDocument();
  });

  test('renders News section with articles', async () => {
    render(<Main_Page />);
    
    await waitFor(() => {
      expect(screen.getByText('YBM CNN News 최신 기사')).toBeInTheDocument();
    });

    expect(screen.getByText('Latest CNN News: Global Economy')).toBeInTheDocument();
    expect(screen.getByText('Breaking News: Technology Trends')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    // 일시적으로 API 에러 시뮬레이션
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API Error'));

    render(<Main_Page />);
    
    await waitFor(() => {
      expect(screen.getByText('데이터를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });
}); 