"use client";

import React, { useState, useRef, useEffect } from 'react';
import data from '../public/data/data.json';

interface Article {
  englishSentences: string[];
  koreanSentences: string[];
}

export default function EnglishPractice() {
  // 데이터 파일에서 기사 데이터 가져오기
  const sampleArticle: Article = data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedSentences, setCompletedSentences] = useState<string[]>([]);
  const [remainingSentences, setRemainingSentences] = useState<string[]>(sampleArticle.koreanSentences);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoCorrecting, setIsAutoCorrecting] = useState(false);
  const [inputFeedback, setInputFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [inputCount, setInputCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingSoundRef = useRef<HTMLAudioElement>(null);
  const successSoundRef = useRef<HTMLAudioElement>(null);
  const errorSoundRef = useRef<HTMLAudioElement>(null);
  const autoCorrectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 초기 렌더링 시 입력 필드에 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // 남은 문장들 업데이트
    setRemainingSentences(sampleArticle.koreanSentences.slice(currentIndex));
    
    // 진행 상황 퍼센트 계산
    if (sampleArticle.englishSentences.length > 0) {
      setProgress((currentIndex / sampleArticle.englishSentences.length) * 100);
    }
  }, [currentIndex]);

  // 타자 소리 재생
  const playTypingSound = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.currentTime = 0;
      typingSoundRef.current.play().catch(err => console.log('오디오 재생 실패:', err));
    }
  };

  // 성공 소리 재생
  const playSuccessSound = () => {
    if (successSoundRef.current) {
      successSoundRef.current.currentTime = 0;
      successSoundRef.current.play().catch(err => console.log('오디오 재생 실패:', err));
    }
  };

  // 오류 소리 재생
  const playErrorSound = () => {
    if (errorSoundRef.current) {
      errorSoundRef.current.currentTime = 0;
      errorSoundRef.current.play().catch(err => console.log('오디오 재생 실패:', err));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setUserInput(newInput);
    playTypingSound();
    
    // 입력 횟수 증가
    setInputCount(prevCount => prevCount + 1);
    
    // 3번 입력 후 자동 교정
    if (inputCount >= 2) { // 0, 1, 2 이후로 교정 (3번째 입력부터)
      simpleCorrectionCheck(newInput);
      setInputCount(0); // 카운트 리셋
    }
    
    // 실시간 입력 피드백 제공
    checkInputCorrectness(newInput);
  };

  // 실시간 입력 피드백
  const checkInputCorrectness = (input: string) => {
    if (!input) {
      setInputFeedback(null);
      return;
    }
    
    const correctAnswer = sampleArticle.englishSentences[currentIndex];
    const inputWords = input.toLowerCase().trim().split(' ');
    const answerWords = correctAnswer.toLowerCase().trim().split(' ');
    
    // 현재 입력된 단어까지만 검사
    for (let i = 0; i < inputWords.length; i++) {
      if (i >= answerWords.length || inputWords[i] !== answerWords[i]) {
        setInputFeedback('wrong');
        return;
      }
    }
    
    setInputFeedback('correct');
  };

  // 단순화된 교정 함수 - 대소문자와 특수문자만 교정
  const simpleCorrectionCheck = (currentInput: string = userInput) => {
    if (!currentInput.trim()) return; // 입력이 비어있으면 무시
    
    const correctAnswer = sampleArticle.englishSentences[currentIndex];
    // 특수문자 제거
    const normalizeText = (text: string) => text.toLowerCase().replace(/[^a-z0-9\s]/gi, '').trim();
    const normalizedInput = normalizeText(currentInput);
    const normalizedAnswer = normalizeText(correctAnswer);
    
    // 기본적인 내용이 일치하는지 확인 (대소문자 및 특수문자 무시)
    if (normalizedInput === normalizedAnswer) {
      // 내용은 같지만 형식(대소문자, 특수문자)이 다른 경우에만 교정
      if (currentInput !== correctAnswer) {
        setIsAutoCorrecting(true);
        setUserInput(correctAnswer);
        
        // 자동 교정 후 시각적 피드백
        setTimeout(() => {
          setIsAutoCorrecting(false);
        }, 500);
      }
    } else {
      // 내용이 완전히 일치하지는 않지만 단어 단위로 교정 가능한지 확인
      const inputWords = currentInput.split(' ');
      const answerWords = correctAnswer.split(' ');
      
      // 사용자가 입력한 단어 수만큼만 검사
      let corrected = false;
      let newInput = [...inputWords];
      
      for (let i = 0; i < inputWords.length && i < answerWords.length; i++) {
        // 대소문자 및 특수문자만 다른 경우
        if (normalizeText(inputWords[i]) === normalizeText(answerWords[i]) && 
            inputWords[i] !== answerWords[i]) {
          newInput[i] = answerWords[i];
          corrected = true;
        }
      }
      
      if (corrected) {
        const correctedInput = newInput.join(' ');
        setIsAutoCorrecting(true);
        setUserInput(correctedInput);
        
        setTimeout(() => {
          setIsAutoCorrecting(false);
        }, 500);
      }
    }
  };

  const typewriterEffect = (text: string) => {
    setIsTyping(true);
    setTypewriterText('');
    let i = 0;
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypewriterText((prev) => prev + text.charAt(i));
        playTypingSound(); // 타이핑 소리 재생
        i++;
      } else {
        clearInterval(typing);
        setIsTyping(false);
      }
    }, 50); // 타이핑 속도 조절
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 사용자 입력과 정답 비교 (대소문자 무시, 공백 정규화)
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedAnswer = sampleArticle.englishSentences[currentIndex].trim().toLowerCase();
    
    if (normalizedInput === normalizedAnswer) {
      // 정답 소리 재생
      playSuccessSound();
      
      // 정답이면 애니메이션 효과를 위해 상태 변경
      setIsCorrect(true);
      
      // 타자기 효과로 정답 보여주기
      typewriterEffect(sampleArticle.englishSentences[currentIndex]);
      
      // 애니메이션 효과 후 상태 업데이트
      setTimeout(() => {
        setCompletedSentences([...completedSentences, sampleArticle.englishSentences[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
        setUserInput('');
        setIsCorrect(false);
      }, 2000); // 2초 후 다음 문장으로 진행
    } else {
      // 오답 소리 재생
      playErrorSound();
      
      // 오답이면 입력 필드 초기화
      setUserInput('');
      // 오답 효과
      if (inputRef.current) {
        inputRef.current.classList.add('border-red-500');
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.classList.remove('border-red-500');
          }
        }, 500);
      }
    }
  };

  // 키 애니메이션 효과
  const handleKeyPress = (key: string) => {
    const keyElement = document.getElementById(`key-${key}`);
    if (keyElement) {
      keyElement.classList.add('key-press');
      setTimeout(() => {
        keyElement.classList.remove('key-press');
      }, 100);
    }
    
    if (key === 'backspace') {
      setUserInput(userInput.slice(0, -1)); // 마지막 문자 제거
    } else if (key === 'space') {
      setUserInput(userInput + ' '); // 공백 추가
    } else {
      setUserInput(userInput + key); // 일반 키 추가
    }
    
    playTypingSound();
    
    // 입력 횟수 증가
    setInputCount(prevCount => prevCount + 1);
    
    // 3번 입력 후 자동 교정
    if (inputCount >= 2) {
      simpleCorrectionCheck(key === 'backspace' ? userInput.slice(0, -1) : 
                           key === 'space' ? userInput + ' ' : userInput + key);
      setInputCount(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Enter 키 입력 시 자동 교정 후 제출
      simpleCorrectionCheck();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen" style={{ fontFamily: 'Times New Roman', backgroundImage: 'url("https://claude.ai/new")', backgroundSize: 'cover' }}>
      <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-800 pb-2">CNN 기사로 영어 공부하기</h1>
      
      {/* 오디오 요소들 (화면에 보이지 않음) */}
      <audio ref={typingSoundRef} src="https://www.fesliyanstudios.com/play-mp3/6" preload="auto"></audio>
      <audio ref={successSoundRef} src="https://www.fesliyanstudios.com/play-mp3/37" preload="auto"></audio>
      <audio ref={errorSoundRef} src="https://www.fesliyanstudios.com/play-mp3/41" preload="auto"></audio>

      {/* 진행률 표시 */}
      <div className="mb-6 bg-gray-300 rounded-full h-4 overflow-hidden border border-gray-800" data-testid="progress-bar">
        <div 
          className="h-full bg-green-700 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* 완료된 영어 문장 섹션 */}
      <div className="mb-6 rounded-lg border border-gray-800 bg-white shadow-md overflow-hidden">
        <h2 className="text-xl font-bold bg-gray-800 text-white py-2 px-4">{completedSentences.length > 0 ? completedSentences[0] : ' '}</h2>
        <div className="p-6 space-y-2 bg-gray-50">
          {completedSentences.slice(1).map((sentence, idx) => (
            <p key={idx} className="mb-2 text-gray-900 leading-relaxed">{sentence}</p>
          ))}
          {isCorrect && (
            <p className="mb-2 text-black font-medium typewriter">
              {isTyping ? typewriterText : sampleArticle.englishSentences[currentIndex]}
              <span className="cursor animate-blink">|</span>
            </p>
          )}
          {completedSentences.length === 0 && !isCorrect && (
            <p className="text-gray-500 italic">Your translated sentences will appear here...</p>
          )}
        </div>
      </div>
      
      {/* 현재 번역할 한국어 문장 및 입력 섹션 통합 */}
      {currentIndex < sampleArticle.englishSentences.length ? (
        <div className={`mb-6 p-4 rounded-lg transition-colors duration-300 ${isCorrect ? 'bg-green-50' : 'bg-amber-50'} border border-gray-400 shadow-md`}>
          <h2 className="text-lg font-bold mb-2 border-b border-gray-400 pb-1">{sampleArticle.koreanSentences[currentIndex]}</h2>
          <form onSubmit={handleSubmit} className="mt-4" data-testid="translation-form">
            <div className="relative mt-4">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`w-full p-3 border ${isAutoCorrecting ? 'border-blue-500 bg-blue-50' : inputFeedback === 'correct' ? 'border-green-500 bg-green-50' : inputFeedback === 'wrong' ? 'border-red-500 bg-red-50' : 'border-gray-400'} rounded-lg text-lg bg-white focus:outline-none focus:ring-1 transition-all`}
                placeholder="영어로 번역하세요..."
                disabled={isTyping}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 animate-blink">|</span>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-6 bg-green-50 rounded-lg border border-green-500 shadow-md mb-6">
          <p className="text-xl font-bold text-center">모든 문장을 완료했습니다! 👏</p>
        </div>
      )}
      
      {/* 남은 한국어 번역 섹션 */}
      <div className="mb-6 rounded-lg border border-gray-400 bg-white shadow-md overflow-hidden">
        <h2 className="text-lg font-bold bg-gray-200 py-2 px-4 border-b border-gray-400">남은 한국어 번역</h2>
        <div className="p-4 space-y-2">
          {remainingSentences.slice(1).map((sentence, idx) => (
            <p key={idx} className="mb-1 pl-4 border-l border-gray-300 text-gray-700">{sentence}</p>
          ))}
          {remainingSentences.length <= 1 && (
            <p className="text-gray-500 italic">모든 한국어 문장이 번역되었습니다!</p>
          )}
        </div>
      </div>
    </div>
  );
}