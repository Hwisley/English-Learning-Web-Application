import React, { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';

interface VideoItem {
  id: string;
  originalTitle: string;
  videoUrl: string;
  publishedAt?: string;
}

interface NewsItem {
  id: string;
  originalTitle: string;
  videoUrl: string;
  publishedAt?: string;
}

const Main_Page: React.FC = () => {
  const [lvAcademyVideos, setLvAcademyVideos] = useState<VideoItem[]>([]);
  const [toddlerVideos, setToddlerVideos] = useState<VideoItem[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Refs for horizontal scrolling
  const lvAcademyScrollRef = useRef<HTMLDivElement>(null);
  const toddlerScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Lv Academy videos
        const lvAcademyResponse = await fetch('http://localhost:8080/api/contents?sourceType=lv-academy');
        const lvAcademyData = await lvAcademyResponse.json();
        setLvAcademyVideos(lvAcademyData);

        // Toddler videos
        const toddlerResponse = await fetch('http://localhost:8080/api/contents?sourceType=lv-academy-toddler');
        const toddlerData = await toddlerResponse.json();
        setToddlerVideos(toddlerData);

        // News articles
        const newsResponse = await fetch('http://localhost:8080/api/contents?sourceType=ybm-cnn');
        const newsData = await newsResponse.json();
        setNewsArticles(newsData);

        setError(null);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('Data fetching error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isNewContent = (date: string | undefined) => {
    if (!date) return false;
    const contentDate = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - contentDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Scroll handlers for horizontal scrolling
  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" role="status">
          <span className="sr-only">로딩 중...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      {/* [Group 1] YouTube Channel – Live Academy */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Academy - 라이브 스트리밍</h2>
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={() => scrollLeft(lvAcademyScrollRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Horizontally scrollable content */}
          <div 
            ref={lvAcademyScrollRef} 
            className="overflow-x-auto flex gap-4 pb-4 scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {lvAcademyVideos.length > 0 ? (
              lvAcademyVideos.map((video) => (
                <div key={video.id} className="flex-none w-64">
                  <div className="relative">
                    <img
                      src={video.videoUrl}
                      alt={video.originalTitle}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    {isNewContent(video.publishedAt) && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-semibold line-clamp-2">{video.originalTitle}</h3>
                  {video.publishedAt && (
                    <p className="text-sm text-gray-600">
                      {format(new Date(video.publishedAt), 'yyyy-MM-dd')}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-gray-500">현재 라이브 방송 중인 컨텐츠가 없습니다.</p>
              </div>
            )}
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={() => scrollRight(lvAcademyScrollRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* [Group 2] YouTube Channel – Live Academy Toddler */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Live Academy Toddler - 라이브 스트리밍</h2>
        <div className="relative">
          {/* Left scroll button */}
          <button 
            onClick={() => scrollLeft(toddlerScrollRef)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Horizontally scrollable content */}
          <div 
            ref={toddlerScrollRef} 
            className="overflow-x-auto flex gap-4 pb-4 scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {toddlerVideos.length > 0 ? (
              toddlerVideos.map((video) => (
                <div key={video.id} className="flex-none w-64">
                  <div className="relative">
                    <img
                      src={video.videoUrl}
                      alt={video.originalTitle}
                      className="w-full h-36 object-cover rounded-lg"
                    />
                    {isNewContent(video.publishedAt) && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-semibold line-clamp-2">{video.originalTitle}</h3>
                  {video.publishedAt && (
                    <p className="text-sm text-gray-600">
                      {format(new Date(video.publishedAt), 'yyyy-MM-dd')}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-gray-500">현재 라이브 방송 중인 컨텐츠가 없습니다.</p>
              </div>
            )}
          </div>
          
          {/* Right scroll button */}
          <button 
            onClick={() => scrollRight(toddlerScrollRef)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* [Group 3] YBM CNN News Article List */}
      <section className="flex-grow">
        <h2 className="text-2xl font-bold mb-4">YBM CNN News 최신 기사</h2>
        <div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {newsArticles.length > 0 ? (
              newsArticles.map((article) => (
                <li key={article.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <a
                    href={article.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                      {article.originalTitle}
                    </h3>
                    {article.publishedAt && (
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(article.publishedAt), 'yyyy-MM-dd')}
                      </p>
                    )}
                  </a>
                </li>
              ))
            ) : (
              <li className="p-8 text-center text-gray-500">
                사용 가능한 뉴스 기사가 없습니다.
              </li>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Main_Page; 