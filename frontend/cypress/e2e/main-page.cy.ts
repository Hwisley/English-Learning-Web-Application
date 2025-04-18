describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('/Main_Page'); // 실제 경로에 맞게 조정
  });

  it('displays all sections', () => {
    // 헤더 확인
    cy.contains('Live Academy - 라이브 스트리밍').should('be.visible');
    cy.contains('Live Academy Toddler - 라이브 스트리밍').should('be.visible');
    cy.contains('YBM CNN News 최신 기사').should('be.visible');
  });

  it('displays video thumbnails', () => {
    // 비디오 썸네일 이미지 확인
    cy.get('img').should('be.visible');
    cy.get('img').should('have.length.at.least', 1);
  });

  it('displays navigation controls', () => {
    // 스크롤 버튼 확인
    cy.get('button[aria-label="Scroll left"]').should('be.visible');
    cy.get('button[aria-label="Scroll right"]').should('be.visible');
  });

  it('allows horizontal scrolling', () => {
    // 첫 번째 섹션의 가로 스크롤 테스트
    const scrollContainer = cy.get('div.overflow-x-auto').first();
    
    // 오른쪽 스크롤 버튼 클릭
    cy.get('button[aria-label="Scroll right"]').first().click();
    
    // 스크롤이 변경되었는지 확인
    scrollContainer.then($el => {
      const initialScrollLeft = $el.scrollLeft();
      
      // 잠시 대기 후 확인
      cy.wait(500);
      
      scrollContainer.then($el2 => {
        const afterScrollLeft = $el2.scrollLeft();
        expect(afterScrollLeft).to.be.greaterThan(initialScrollLeft);
      });
    });
  });

  it('shows LIVE tag on live streams', () => {
    // LIVE 태그 확인
    cy.contains('LIVE').should('be.visible');
  });
}); 