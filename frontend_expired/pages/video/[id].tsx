import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import VideoDetail from '../../components/VideoDetail';
import { getVideoById, VideoDetail as VideoDetailType } from '../../services/api';

// 샘플 비디오 데이터 - API 요청 실패 시 폴백으로 사용
const SAMPLE_VIDEOS = {
  'YGORh8Ytd8g': {
    title: 'English for kids with Steve and Maggie | English speaking with Stories',
    sentences: [
      {
        korean: '스티브와 매직으로 배우는 어린이 영어',
        english: 'English for kids with Steve and Maggie',
        timestamp: 5
      },
      {
        korean: '안녕하세요, 저는 스티브입니다.',
        english: 'Hello, I\'m Steve.',
        timestamp: 15
      },
      {
        korean: '그리고 이건 매직입니다.',
        english: 'And this is Maggie.',
        timestamp: 20
      },
      {
        korean: '오늘은 영어로 이야기하는 방법을 배울 거예요.',
        english: 'Today we\'re going to learn how to speak English.',
        timestamp: 25
      },
      {
        korean: '이건 사과입니다.',
        english: 'This is an apple.',
        timestamp: 35
      },
      {
        korean: '매직은 사과를 좋아합니다.',
        english: 'Maggie likes apples.',
        timestamp: 40
      },
      {
        korean: '이건 바나나입니다.',
        english: 'This is a banana.',
        timestamp: 50
      },
      {
        korean: '매직은 바나나도 좋아합니다.',
        english: 'Maggie also likes bananas.',
        timestamp: 55
      },
      {
        korean: '아이들과 함께 따라해보세요.',
        english: 'Repeat with me, kids.',
        timestamp: 65
      },
      {
        korean: '스티브는 무엇을 하고 있나요?',
        english: 'What is Steve doing?',
        timestamp: 75
      },
    ]
  },
  'jS4aFq5-91M': {
    title: 'Everyday Conversations: Learning American English',
    sentences: [
      {
        korean: '매일 대화: 미국 영어 배우기',
        english: 'Everyday Conversations: Learning American English',
        timestamp: 5
      },
      {
        korean: '안녕하세요, 오늘 어떻게 지내세요?',
        english: 'Hello, how are you today?',
        timestamp: 15
      },
      {
        korean: '잘 지내요, 감사합니다. 당신은요?',
        english: 'I\'m fine, thank you. And you?',
        timestamp: 20
      },
      {
        korean: '저도 좋아요. 주말 잘 보내셨어요?',
        english: 'I\'m good too. Did you have a nice weekend?',
        timestamp: 25
      },
      {
        korean: '네, 아주 좋았어요. 공원에 갔었어요.',
        english: 'Yes, it was very nice. I went to the park.',
        timestamp: 35
      },
      {
        korean: '날씨가 어땠나요?',
        english: 'How was the weather?',
        timestamp: 45
      },
      {
        korean: '화창했어요. 당신은 무엇을 했나요?',
        english: 'It was sunny. What did you do?',
        timestamp: 50
      },
      {
        korean: '집에서 영화를 봤어요.',
        english: 'I watched a movie at home.',
        timestamp: 60
      },
      {
        korean: '어떤 영화를 보셨나요?',
        english: 'What movie did you watch?',
        timestamp: 65
      },
      {
        korean: '코미디였어요. 정말 재미있었어요.',
        english: 'It was a comedy. It was really funny.',
        timestamp: 70
      },
    ]
  }
};

const VideoPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [videoData, setVideoData] = useState<VideoDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchVideoData = async () => {
      try {
        setLoading(true);
        
        // 백엔드 API에서 비디오 데이터 가져오기
        const videoId = id as string;
        const data = await getVideoById(videoId);
        
        setVideoData(data);
        setError(null);
      } catch (err) {
        console.error('비디오 데이터 가져오기 오류:', err);
        setError('비디오 데이터를 불러오는 중 오류가 발생했습니다. 샘플 데이터를 표시합니다.');
        
        // API 요청 실패 시 샘플 데이터로 폴백
        const videoId = id as string;
        const sampleData = SAMPLE_VIDEOS[videoId as keyof typeof SAMPLE_VIDEOS];
        
        if (sampleData) {
          setVideoData(sampleData);
          setError(null);
        } else {
          setError('비디오를 찾을 수 없습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !videoData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error || '비디오 정보를 불러올 수 없습니다.'}</div>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          홈으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>{videoData.title} | 영어 학습</title>
        <meta name="description" content={`${videoData.title} - 영어 학습을 위한 비디오`} />
      </Head>

      <main>
        <VideoDetail 
          videoId={id as string} 
          title={videoData.title}
          sentences={videoData.sentences}
        />
      </main>
    </div>
  );
};

export default VideoPage; 