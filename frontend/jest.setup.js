// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Service Worker 설정
// import { server } from './mocks/server'

// // 테스트 전에 MSW 서버 시작
// beforeAll(() => server.listen())

// // 각 테스트 후에 핸들러 초기화
// afterEach(() => server.resetHandlers())

// // 모든 테스트가 끝난 후 서버 종료
// afterAll(() => server.close())

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