import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import StudyPage from '../../components/Study'
import '@testing-library/jest-dom'

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      eng_script: ['Hello, how are you?', 'I am fine, thank you.'],
      kor_script: ['안녕하세요, 어떻게 지내세요?', '저는 잘 지내요, 감사합니다.']
    }),
  }),
) as jest.Mock

describe('StudyPage Component', () => {
  beforeEach(() => {
    // Clear mock data between tests
    jest.clearAllMocks()
  })

  test('renders study page with input field', async () => {
    render(<StudyPage />)
    
    // Wait for the fetch to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
    
    // Check if input field exists
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  test('shows correct answer feedback when user enters correct text', async () => {
    render(<StudyPage />)
    
    // Wait for the fetch to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
    
    // Type the correct answer
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'Hello, how are you?' } })
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    // Check feedback is displayed
    const feedback = await screen.findByText('정답! Correct!')
    expect(feedback).toBeInTheDocument()
  })

  test('shows incorrect answer feedback when user enters wrong text', async () => {
    render(<StudyPage />)
    
    // Wait for the fetch to complete
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
    
    // Type an incorrect answer
    const inputElement = screen.getByRole('textbox')
    fireEvent.change(inputElement, { target: { value: 'Wrong answer' } })
    fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    // Check feedback is displayed
    const feedback = await screen.findByText('틀렸자나! Incorrect!')
    expect(feedback).toBeInTheDocument()
  })
}) 