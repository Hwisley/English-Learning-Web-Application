// jest-dom은 DOM 노드에 대한 어서션을 위한 커스텀 jest 매처를 추가합니다
import '@testing-library/jest-dom';

// 테스트 중 fetch API 모킹을 위한 설정
global.fetch = jest.fn();

// 환경 변수 설정
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080/api'; 

// Mock the Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }
  },
})) 