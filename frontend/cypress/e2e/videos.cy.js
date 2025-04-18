describe('비디오 목록 페이지', () => {
  beforeEach(() => {
    // API 응답 모킹
    cy.intercept('GET', '/api/videos', {
      statusCode: 200,
      body: {
        lvAcademy: [
          {
            id: 'YGORh8Ytd8g',
            title: 'English for kids with Steve and Maggie',
            thumbnail: 'https://i.ytimg.com/vi/YGORh8Ytd8g/hqdefault.jpg',
            channelName: 'Wow English TV',
            isLive: true
          }
        ],
        toddler: [
          {
            id: 'jS4aFq5-91M',
            title: 'Everyday Conversations: Learning American English',
            thumbnail: 'https://i.ytimg.com/vi/jS4aFq5-91M/hqdefault.jpg',
            channelName: 'VOA Learning English',
            isLive: true
          }
        ]
      }
    }).as('getVideos');

    // 비디오 페이지 방문
    cy.visit('/videos');
  });

  it('비디오 목록 페이지가 로드되고 비디오 카드가 표시됩니다', () => {
    // API 호출이 완료될 때까지 대기
    cy.wait('@getVideos');

    // 페이지 제목 확인
    cy.contains('h1', '영어 학습 비디오').should('be.visible');

    // 카테고리 제목 확인
    cy.contains('h2', 'LV 아카데미 라이브 방송').should('be.visible');
    cy.contains('h2', '영어 유치원 라이브 방송').should('be.visible');

    // 비디오 카드가 표시되는지 확인
    cy.contains('English for kids with Steve and Maggie').should('be.visible');
    cy.contains('Everyday Conversations: Learning American English').should('be.visible');

    // 썸네일 이미지 확인
    cy.get('img[alt="English for kids with Steve and Maggie"]').should('be.visible');
  });

  it('비디오 카드를 클릭하면 상세 페이지로 이동합니다', () => {
    // 비디오 상세 페이지 API 응답 모킹
    cy.intercept('GET', '/api/videos/YGORh8Ytd8g', {
      statusCode: 200,
      body: {
        title: 'English for kids with Steve and Maggie',
        sentences: [
          {
            korean: '안녕하세요, 저는 스티브입니다.',
            english: 'Hello, I\'m Steve.',
            timestamp: 15
          }
        ]
      }
    }).as('getVideoDetail');

    // API 호출 대기
    cy.wait('@getVideos');

    // 첫번째 비디오 카드 클릭
    cy.contains('English for kids with Steve and Maggie').click();

    // URL 변경 확인
    cy.url().should('include', '/video/YGORh8Ytd8g');

    // 상세 페이지 API 호출 대기
    cy.wait('@getVideoDetail');

    // 영상 플레이어 확인
    cy.get('iframe').should('be.visible');

    // 문장 목록 확인
    cy.contains('안녕하세요, 저는 스티브입니다.').should('be.visible');
    cy.contains('Hello, I\'m Steve.').should('be.visible');
  });
}); 