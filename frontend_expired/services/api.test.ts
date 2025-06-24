import { getAllVideos, getVideoById, getVideoSentences } from './api';

// fetch 모킹
const mockFetch = global.fetch as jest.Mock;

describe('API 서비스 테스트', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('getAllVideos가 올바른 데이터를 반환합니다', async () => {
    // 모의 응답 데이터
    const mockData = {
      lvAcademy: [
        {
          id: 'test-id-1',
          title: '테스트 비디오 1',
          thumbnail: 'https://example.com/thumbnail1.jpg',
          channelName: '테스트 채널 1',
          isLive: true
        }
      ],
      toddler: [
        {
          id: 'test-id-2',
          title: '테스트 비디오 2',
          thumbnail: 'https://example.com/thumbnail2.jpg',
          channelName: '테스트 채널 2',
          isLive: false
        }
      ]
    };

    // fetch 함수 모킹
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await getAllVideos();
    
    // API 호출 확인
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/videos', 
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      })
    );
    
    // 반환 데이터 확인
    expect(result).toEqual(mockData);
    expect(result.lvAcademy[0].id).toBe('test-id-1');
    expect(result.toddler[0].id).toBe('test-id-2');
  });

  it('getVideoById가 올바른 데이터를 반환합니다', async () => {
    const videoId = 'test-video-id';
    
    // 모의 응답 데이터
    const mockData = {
      title: '테스트 비디오 제목',
      sentences: [
        {
          korean: '안녕하세요',
          english: 'Hello',
          timestamp: 10
        }
      ]
    };

    // fetch 함수 모킹
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    });

    const result = await getVideoById(videoId);
    
    // API 호출 확인
    expect(mockFetch).toHaveBeenCalledWith(
      `http://localhost:8080/api/videos/${videoId}`, 
      expect.anything()
    );
    
    // 반환 데이터 확인
    expect(result).toEqual(mockData);
    expect(result.title).toBe('테스트 비디오 제목');
    expect(result.sentences[0].korean).toBe('안녕하세요');
  });

  it('API 오류 처리가 올바르게 작동합니다', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'API 오류 발생'
    });

    await expect(getAllVideos()).rejects.toThrow('API 오류 발생');
  });
}); 