import { useRef } from 'react';
import VideoSlider from "@/components/VideoSlider";
import { getContents } from '@/services/api';


const contents: React.FC = () => {
  // 샘플 비디오 데이터
  const lvAcademyVideos = [
    {
      videoID: "1",
      channelID: "channel1",
      title: "영어 회화 기초 강의",
      description: "기초 영어 회화를 배워보세요",
      thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
      publishedAt: "2024-03-20"
    },
    {
      videoID: "2",
      channelID: "channel1",
      title: "영어 회화 기초 강의 2",
      description: "기초 영어 회화를 배워보세요",
      thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
      publishedAt: "2024-03-20"
    },
    {
      videoID: "3",
      channelID: "channel1",
      title: "영어 회화 기초 강의 3 ",
      description: "기초 영어 회화를 배워보세요",
      thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
      publishedAt: "2024-03-20"
    },
    {
      videoID: "4",
      channelID: "channel1",
      title: "영어 회화 기초 강의 4",
      description: "기초 영어 회화를 배워보세요",
      thumbnailUrl: "https://i.ytimg.com/vi/bTw5L_r4nHE/hqdefault.jpg",
      publishedAt: "2024-03-20"
    },
  ];
  // 스크롤 참조 생성
  const lvAcademyScrollRef = useRef<HTMLDivElement>(null);

  // 스크롤 함수들
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

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoSlider
        title="Live Academy - 라이브 스트리밍"
        videos={lvAcademyVideos}
        scrollRef={lvAcademyScrollRef}
        onScrollLeft={() => scrollLeft(lvAcademyScrollRef)}
        onScrollRight={() => scrollRight(lvAcademyScrollRef)}
      />
    </div>
  );
};

export default contents; 
