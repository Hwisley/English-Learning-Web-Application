// jest-dom은 DOM 노드에 대한 어서션을 위한 커스텀 jest 매처를 추가합니다
import '@testing-library/jest-dom';

// 테스트 중 fetch API 모킹을 위한 설정
global.fetch = jest.fn();

// 환경 변수 설정
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080/api'; 