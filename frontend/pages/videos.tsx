import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import VideoList from '../components/VideoList';
import { getAllVideos, Video } from '../services/api';

// 샘플 비디오 데이터 - API 요청 실패 시 폴백으로 사용
const SAMPLE_VIDEOS = {
  lvAcademy: [
    {
      id: 'YGORh8Ytd8g',
      title: 'English for kids with Steve and Maggie | English speaking with Stories',
      thumbnail: 'https://i.ytimg.com/vi/YGORh8Ytd8g/hqdefault.jpg',
      channelName: 'Wow English TV',
      isLive: true
    },
    {
      id: 'V-Rj2CXgVrU',
      title: 'Learn English with Friends | The One with All the Poker',
      thumbnail: 'https://i.ytimg.com/vi/V-Rj2CXgVrU/hqdefault.jpg',
      channelName: 'English with Friends',
      isLive: true
    },
    {
      id: 'bTw5L_r4nHE',
      title: 'Everyday English Conversations Practice | Improve Your English Speaking Skills',
      thumbnail: 'https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg',
      channelName: 'English Speaking Success',
      isLive: false
    }
  ],
  toddler: [
    {
      id: 'jS4aFq5-91M',
      title: 'Everyday Conversations: Learning American English',
      thumbnail: 'https://i.ytimg.com/vi/jS4aFq5-91M/hqdefault.jpg',
      channelName: 'VOA Learning English',
      isLive: true
    },
    {
      id: 'RP1AL2eU0Ns',
      title: 'Talking to Toddlers: Simple Speech Activities for Ages 2-4',
      thumbnail: 'https://i.ytimg.com/vi/RP1AL2eU0Ns/hqdefault.jpg',
      channelName: 'Early Learning Academy',
      isLive: true
    },
    {
      id: 'XzaxG89qz_g',
      title: 'Learn English Through Nursery Rhymes | Kids Songs Collection',
      thumbnail: 'https://i.ytimg.com/vi/XzaxG89qz_g/hqdefault.jpg',
      channelName: 'Super Simple Songs',
      isLive: false
    }
  ]
};

const VideosPage: React.FC = () => {
  const [lvAcademyVideos, setLvAcademyVideos] = useState<Video[]>([]);
  const [toddlerVideos, setToddlerVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // 백엔드 API에서 비디오 데이터 가져오기
        const videosData = await getAllVideos();
        
        setLvAcademyVideos(videosData.lvAcademy || []);
        setToddlerVideos(videosData.toddler || []);
        setError(null);
      } catch (err) {
        console.error('비디오 데이터 가져오기 오류:', err);
        setError('비디오 데이터를 불러오는 중 오류가 발생했습니다. 샘플 데이터를 표시합니다.');
        
        // API 요청 실패 시 샘플 데이터로 폴백
        setLvAcademyVideos(SAMPLE_VIDEOS.lvAcademy);
        setToddlerVideos(SAMPLE_VIDEOS.toddler);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>영어 학습 비디오 | English Learning</title>
        <meta name="description" content="영어 학습을 위한 유튜브 비디오 모음" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">영어 학습 비디오</h1>
        
        <VideoList 
          title="LV 아카데미 라이브 방송" 
          videos={lvAcademyVideos.filter(video => video.isLive)} 
        />
        
        <VideoList 
          title="영어 유치원 라이브 방송" 
          videos={toddlerVideos.filter(video => video.isLive)} 
        />
        
        <VideoList 
          title="추천 영어 학습 비디오" 
          videos={[
            ...lvAcademyVideos.filter(video => !video.isLive),
            ...toddlerVideos.filter(video => !video.isLive)
          ]} 
        />
      </main>
    </div>
  );
};

export default VideosPage; 