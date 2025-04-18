import { rest } from 'msw';

// 모의 데이터
const lvAcademyVideos = [
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

const toddlerVideos = [
  {
    id: 'video3',
    title: '[LIVE] Toddler English Class',
    thumbnailUrl: 'https://example.com/thumbnail3.jpg',
    publishedAt: new Date().toISOString(),
    channelId: 'channel2',
    isLive: true
  }
];

const newsArticles = [
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

// API 핸들러 정의
export const handlers = [
  // Live Academy 비디오 API
  rest.get('/api/youtube/lv-academy', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lvAcademyVideos));
  }),
  
  // Toddler 비디오 API
  rest.get('/api/youtube/toddler', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(toddlerVideos));
  }),
  
  // 뉴스 기사 API
  rest.get('/api/news', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(newsArticles));
  })
]; 