import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import EnglishPractice from '../../pages/index'
import '@testing-library/jest-dom'

// Mock data for testing
jest.mock('../../public/data/data.json', () => ({
  englishSentences: [
    'This is a test sentence.',
    'Hello, how are you today?'
  ],
  koreanSentences: [
    '이것은 테스트 문장입니다.',
    '안녕하세요, 오늘 어떻게 지내세요?'
  ]
}))

// Mock audio playback
global.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve())
global.HTMLMediaElement.prototype.pause = jest.fn()

describe('EnglishPractice Component', () => {
  beforeEach(() => {
    // Clear mocks between tests
    jest.clearAllMocks()
  })

  test('renders practice page with Korean sentence', async () => {
    render(<EnglishPractice />)
    
    // Check if Korean sentence is displayed
    expect(screen.getByText('이것은 테스트 문장입니다.')).toBeInTheDocument()
    
    // Check if input field exists
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  test('shows progress indicator', () => {
    render(<EnglishPractice />)
    
    // Find progress bar using class instead of role
    const progressElement = screen.getByTestId('progress-bar') || 
                           screen.getByClassName('bg-gray-300 rounded-full h-4') ||
                           screen.getByText((content, element) => {
                             return element?.tagName.toLowerCase() === 'div' && 
                                    element?.classList.contains('mb-6') &&
                                    element?.classList.contains('bg-gray-300');
                           })
    expect(progressElement).toBeInTheDocument()
  })

  test('handles correct answer submission', async () => {
    render(<EnglishPractice />)
    
    // Find input field
    const inputElement = screen.getByRole('textbox')
    
    // Type the correct answer
    fireEvent.change(inputElement, { target: { value: 'This is a test sentence.' } })
    
    // Submit the form using the form element directly
    const formElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'form' && element?.classList.contains('mt-4');
    })
    fireEvent.submit(formElement)
    
    // Check that typewriter effect starts
    await waitFor(() => {
      expect(screen.getByText('This is a test sentence.')).toBeInTheDocument()
    })
  })

  test('handles incorrect answer submission', () => {
    render(<EnglishPractice />)
    
    // Find input field
    const inputElement = screen.getByRole('textbox')
    
    // Type an incorrect answer
    fireEvent.change(inputElement, { target: { value: 'Wrong answer' } })
    
    // Submit the form
    const formElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'form' && element?.classList.contains('mt-4');
    })
    fireEvent.submit(formElement)
    
    // Input should be cleared after incorrect submission
    expect(inputElement).toHaveValue('')
  })
}) 