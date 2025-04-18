describe('English Practice Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the practice page with Korean sentence and input field', () => {
    // 한국어 문장이 표시되는지 확인
    cy.contains('안녕하세요')
    
    // 입력 필드가 있는지 확인
    cy.get('input[type="text"]').should('exist')
    
    // 진행 상태 바가 있는지 확인
    cy.get('progress').should('exist')
  })

  it('allows user to type and submit answers', () => {
    // 입력 필드에 텍스트 입력
    cy.get('input[type="text"]').type('This is a test').should('have.value', 'This is a test')
    
    // 제출 버튼이 있는지 확인
    cy.get('button[type="submit"]').should('exist')
    
    // 폼 제출 (예: Enter 키 누르기)
    cy.get('form').submit()
  })

  it('shows feedback for correct answers', () => {
    // 정답을 입력
    cy.get('input[type="text"]').type('This is a test sentence.')
    cy.get('form').submit()
    
    // 피드백 확인 (애니메이션이나 성공 메시지가 표시되는지)
    cy.contains('This is a test sentence.', { timeout: 5000 }).should('be.visible')
  })

  it('shows feedback for incorrect answers', () => {
    // 오답 입력
    cy.get('input[type="text"]').type('Wrong answer')
    cy.get('form').submit()
    
    // 입력 필드가 초기화되었는지 확인
    cy.get('input[type="text"]').should('have.value', '')
  })
}) 