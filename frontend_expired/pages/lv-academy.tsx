import { useEffect, useState } from 'react';
import Head from 'next/head';

interface Video {
  videoID: string;
  channelID: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
}

export default function LvAcademy() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/data/api?sourceType=lv-academy.json');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>LV Academy - 영어 강의</title>
        <meta name="description" content="LV Academy의 영어 학습 강의를 만나보세요" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">LV Academy 강의</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.videoID} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <div className="text-sm text-gray-500">
                  게시일: {new Date(video.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}