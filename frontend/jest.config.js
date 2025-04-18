const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js와 .env 파일이 있는 Next.js 앱의 경로
  dir: './',
});

// Jest에 전달할 사용자 정의 설정
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // CSS 모듈 등을 무시하는 핸들러
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
};

// createJestConfig는 다음 작업이 필요한 Next.js 구성을 비동기적으로 내보냄
module.exports = createJestConfig(customJestConfig); 