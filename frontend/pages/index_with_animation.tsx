import React, { useState, useRef, useEffect } from 'react';

interface Article {
  englishSentences: string[];
  koreanSentences: string[];
}

export default function EnglishPractice() {
  // 샘플 기사 데이터
  // const sampleArticle: Article = {
  //   englishSentences: [
  //     "The United Nations called for immediate action on climate change.",
  //     "Global temperatures have risen at an alarming rate in the past decade.",
  //     "Many countries have pledged to reduce carbon emissions by 2030.",
  //     "Experts warn that we may soon reach a tipping point.",
  //     "Renewable energy sources are becoming increasingly affordable."
  //   ],
  //   koreanSentences: [
  //     "유엔은 기후 변화에 대한 즉각적인 조치를 촉구했다.",
  //     "지난 10년간 전 세계 기온이 놀라운 속도로 상승했다.",
  //     "많은 국가들이 2030년까지 탄소 배출량을 줄이기로 약속했다.",
  //     "전문가들은 우리가 곧 티핑 포인트에 도달할 수 있다고 경고한다.",
  //     "재생 에너지 원이 점점 더 저렴해지고 있다."
  //   ]
  // };

  const sampleArticle: Article = {
    englishSentences: [
      "aaa",
      "bbb",
      "ccc",
      "ddd",
      "eee",
    ],
    koreanSentences: [
      "ㄱㄱㄱ",
      "ㄴㄴㄴ",
      "ㄷㄷㄷ",
      "ㄹㄹㄹ",
      "ㅁㅁㅁ",
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [completedSentences, setCompletedSentences] = useState<string[]>([]);
  const [remainingSentences, setRemainingSentences] = useState<string[]>(sampleArticle.koreanSentences);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 사용자 입력과 정답 비교 (대소문자 무시, 공백 정규화)
    const normalizedInput = userInput.trim().toLowerCase();
    const normalizedAnswer = sampleArticle.englishSentences[currentIndex].trim().toLowerCase();
    
    if (normalizedInput === normalizedAnswer) {
      // 정답이면 애니메이션 효과를 위해 상태 변경
      setIsCorrect(true);
      
      // 애니메이션 효과 후 상태 업데이트
      setTimeout(() => {
        setCompletedSentences([...completedSentences, sampleArticle.englishSentences[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
        setUserInput('');
        setIsCorrect(false);
      }, 1000); // 1초 후 다음 문장으로 진행
    } else {
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">CNN 기사로 영어 공부하기</h1>
      
      {/* 진행률 표시 */}
      <div className="mb-6 bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* 모래시계 애니메이션 효과가 적용된 컨테이너 */}
      <div className="relative overflow-hidden rounded-lg mb-6 border border-gray-300" style={{ height: '400px' }}>
        {/* 완료된 영어 문장들 (위쪽 부분) */}
        <div 
          className="absolute w-full transition-all duration-1000 ease-out bg-green-50 overflow-y-auto p-4"
          style={{ 
            height: `${progress}%`, 
            top: 0 
          }}
        >
          <h2 className="text-lg font-semibold sticky top-0 bg-green-50 py-1 mb-2 z-10">영어 기사</h2>
          <div className="text-gray-800">
            {completedSentences.map((sentence, idx) => (
              <p key={idx} className="mb-1">{sentence}</p>
            ))}
            {isCorrect && (
              <p className="mb-1 text-blue-500 font-medium animate-pulse">{sampleArticle.englishSentences[currentIndex]}</p>
            )}
          </div>
        </div>
        
        {/* 남은 한국어 번역 (아래쪽 부분) */}
        <div 
          className="absolute w-full transition-all duration-1000 ease-out bg-gray-50 overflow-y-auto p-4"
          style={{ 
            height: `${100 - progress}%`, 
            top: `${progress}%` 
          }}
        >
          <h2 className="text-lg font-semibold sticky top-0 bg-gray-50 py-1 mb-2 z-10">남은 한국어 번역</h2>
          <div className="text-gray-800">
            {remainingSentences.map((sentence, idx) => (
              <p key={idx} className={`mb-1 ${idx === 0 ? 'font-medium' : ''}`}>{sentence}</p>
            ))}
          </div>
        </div>
      </div>
      
      {/* 현재 번역할 한국어 문장 */}
      {currentIndex < sampleArticle.koreanSentences.length && (
        <div className={`mb-4 p-4 rounded transition-colors duration-300 ${isCorrect ? 'bg-green-100' : 'bg-blue-50'}`}>
          <h2 className="text-lg font-semibold mb-2">번역할 문장</h2>
          <p className="text-gray-800">{sampleArticle.koreanSentences[currentIndex]}</p>
        </div>
      )}
      
      {/* 입력 폼 */}
      {currentIndex < sampleArticle.englishSentences.length ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded transition-all"
            placeholder="영어로 번역하세요..."
          />
          <button 
            type="submit" 
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            확인
          </button>
        </form>
      ) : (
        <div className="p-4 bg-yellow-50 rounded">
          <p className="text-lg font-semibold">모든 문장을 완료했습니다! 👏</p>
        </div>
      )}
    </div>
  );
}