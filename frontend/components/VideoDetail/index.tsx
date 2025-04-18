import React, { useState, useRef, useEffect } from 'react';
import styles from './VideoDetail.module.css';
import { Sentence } from '../../services/api';

interface VideoDetailProps {
  videoId: string;
  title: string;
  sentences: Sentence[];
}

const VideoDetail: React.FC<VideoDetailProps> = ({ videoId, title, sentences }) => {
  const [minimizedVideo, setMinimizedVideo] = useState(false);
  const [showKorean, setShowKorean] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  const [inputMode, setInputMode] = useState(false);
  const [userInputs, setUserInputs] = useState<string[]>(Array(sentences.length).fill(''));
  const [inputResults, setInputResults] = useState<Array<'correct' | 'incorrect' | null>>(Array(sentences.length).fill(null));
  const playerRef = useRef<HTMLIFrameElement>(null);

  // 토글 상태 변경 처리
  const toggleKorean = () => {
    // 현재 한국어가 표시 중이고 영어도 표시 중이면
    if (showKorean && showEnglish) {
      // 한국어만 숨김
      setShowKorean(false);
      setShowEnglish(true);
    } 
    // 현재 한국어가 숨겨져 있으면
    else if (!showKorean) {
      // 한국어 표시
      setShowKorean(true);
    }
    // 현재 한국어만 표시 중이면 (영어는 숨겨져 있음)
    else {
      // 한국어를 숨기려면 영어를 표시해야 함
      setShowKorean(false);
      setShowEnglish(true);
    }
  };

  const toggleEnglish = () => {
    // 현재 영어가 표시 중이고 한국어도 표시 중이면
    if (showEnglish && showKorean) {
      // 영어만 숨김
      setShowEnglish(false);
      setShowKorean(true);
    } 
    // 현재 영어가 숨겨져 있으면
    else if (!showEnglish) {
      // 영어 표시
      setShowEnglish(true);
    }
    // 현재 영어만 표시 중이면 (한국어는 숨겨져 있음)
    else {
      // 영어를 숨기려면 한국어를 표시해야 함
      setShowEnglish(false);
      setShowKorean(true);
    }
  };

  // 비디오 최소화/최대화 전환
  const toggleVideoSize = () => {
    setMinimizedVideo(!minimizedVideo);
  };

  // 입력 모드 전환
  const toggleInputMode = () => {
    setInputMode(!inputMode);
    // 입력 모드를 종료할 때 결과와 입력값 초기화
    if (inputMode) {
      setUserInputs(Array(sentences.length).fill(''));
      setInputResults(Array(sentences.length).fill(null));
    }
  };

  // 사용자 입력 처리
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  // 입력값 검증
  const validateInput = (index: number) => {
    const userInput = userInputs[index].trim().toLowerCase();
    const correctAnswer = sentences[index].english.trim().toLowerCase();
    
    const newResults = [...inputResults];
    newResults[index] = userInput === correctAnswer ? 'correct' : 'incorrect';
    setInputResults(newResults);
  };

  // 타임스탬프로 비디오 이동
  const jumpToTimestamp = (timestamp?: number) => {
    if (!timestamp || !playerRef.current) return;
    
    // YouTube iframe API를 통해 비디오 시간 이동
    try {
      if (playerRef.current.contentWindow) {
        playerRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'seekTo',
            args: [timestamp, true]
          }), 
          '*'
        );
      }
    } catch (error) {
      console.error('Failed to seek video:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* 고정 비디오 영역 */}
      <div className={`${styles.videoContainer} ${minimizedVideo ? styles.minimized : ''}`}>
        <iframe
          ref={playerRef}
          className={styles.videoPlayer}
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button 
          className={styles.minimizeButton}
          onClick={toggleVideoSize}
          aria-label={minimizedVideo ? "Maximize video" : "Minimize video"}
        >
          {minimizedVideo ? '↗' : '↘'}
        </button>
      </div>

      {/* 언어 표시 필터 바 */}
      <div className={styles.filterBar}>
        <div className={styles.filterOptions}>
          <button 
            className={`${styles.toggleButton} ${showKorean ? styles.active : ''}`}
            onClick={toggleKorean}
          >
            한국어 {showKorean ? '표시' : '숨김'}
          </button>
          <button 
            className={`${styles.toggleButton} ${showEnglish ? styles.active : ''}`}
            onClick={toggleEnglish}
          >
            영어 {showEnglish ? '표시' : '숨김'}
          </button>
        </div>
      </div>

      {/* 문장 목록 영역 */}
      <div className={styles.sentenceListContainer}>
        {sentences.map((sentence, index) => (
          <div 
            key={index} 
            className={styles.sentenceBlock}
            onClick={() => jumpToTimestamp(sentence.timestamp)}
          >
            {showKorean && (
              <div className={styles.korean}>
                {sentence.korean}
                {sentence.timestamp && (
                  <span className={styles.timestamp}>
                    {Math.floor(sentence.timestamp / 60)}:{(sentence.timestamp % 60).toString().padStart(2, '0')}
                  </span>
                )}
              </div>
            )}
            
            {showEnglish && !inputMode && (
              <div className={styles.english}>{sentence.english}</div>
            )}
            
            {inputMode && (
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  value={userInputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      validateInput(index);
                    }
                  }}
                  placeholder="영어로 번역해보세요..."
                  className={`${styles.englishInput} ${
                    inputResults[index] === 'correct' 
                      ? styles.correctInput 
                      : inputResults[index] === 'incorrect' 
                        ? styles.incorrectInput 
                        : ''
                  }`}
                />
                {inputResults[index] === 'incorrect' && (
                  <div className={styles.correctAnswer}>
                    정답: {sentence.english}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 영어 입력 모드 전환 버튼 */}
      <button 
        className={styles.floatingActionButton}
        onClick={toggleInputMode}
        aria-label={inputMode ? "View mode" : "Input mode"}
      >
        {inputMode ? '👁️' : '✏️'}
      </button>
    </div>
  );
};

export default VideoDetail; 