import { format } from 'date-fns';
import { Video } from '../types/video';

interface VideoSliderProps {
    title: string;
    videos: Video[];
    scrollRef: React.RefObject<HTMLDivElement>;
    onScrollLeft: () => void;
    onScrollRight: () => void;
  }

const VideoSlider: React.FC<VideoSliderProps> = ({
    title,
    videos,
    scrollRef,
    onScrollLeft,
    onScrollRight,
  }) => {
    const isNewContent = (date: string | undefined) => {
      if (!date) return false;
      const contentDate = new Date(date);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - contentDate.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    };
  
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="relative">
          <button 
            onClick={onScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div 
            ref={scrollRef} 
            className="overflow-x-auto flex gap-4 pb-4 scroll-smooth" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.length > 0 ? (
              videos.map((video) => (
                <div key={video.videoID} className="flex-none w-64">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {isNewContent(video.publishedAt) && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-semibold line-clamp-2">{video.title}</h3>
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
          
          <button 
            onClick={onScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-white"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    );
  };

export default VideoSlider; 