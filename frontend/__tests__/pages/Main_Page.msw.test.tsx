import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Main_Page from '../../pages/contents';
import '@testing-library/jest-dom';
import { server } from '../../mocks/server';
import { rest } from 'msw';

describe('Main_Page Component with MSW', () => {
  test('renders page with mocked data', async () => {
    render(<Main_Page />);
    
    // 로딩 상태 확인
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    // 데이터가 로드될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('Live Academy - 라이브 스트리밍')).toBeInTheDocument();
    });
    
    // 영상 섹션 확인
    expect(screen.getByText('[LIVE] Live Academy English Class')).toBeInTheDocument();
    expect(screen.getByText('[LIVE] Toddler English Class')).toBeInTheDocument();
    
    // 뉴스 섹션 확인
    expect(screen.getByText('Latest CNN News: Global Economy')).toBeInTheDocument();
  });
  
  test('handles API error scenarios', async () => {
    // 일시적으로 오류 응답으로 서버 핸들러 재정의
    server.use(
      rest.get('/api/youtube/lv-academy', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: 'Server error' }));
      })
    );
    
    render(<Main_Page />);
    
    // 오류 메시지가 표시될 때까지 대기
    await waitFor(() => {
      expect(screen.getByText('데이터를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    });
  });
  
  test('renders empty state when no videos available', async () => {
    // 빈 데이터 반환하도록 핸들러 재정의
    server.use(
      rest.get('/api/youtube/lv-academy', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      }),
      rest.get('/api/youtube/toddler', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    
    render(<Main_Page />);
    
    await waitFor(() => {
      expect(screen.queryAllByText('현재 라이브 방송 중인 컨텐츠가 없습니다.').length).toBe(2);
    });
  });
}); 