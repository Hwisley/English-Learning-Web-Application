import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './VideoList.module.css';
import { Video } from '../../services/api';

interface VideoListProps {
  title: string;
  videos: Video[];
}

const VideoList: React.FC<VideoListProps> = ({ title, videos }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      
      {videos.length === 0 ? (
        <p className={styles.noVideos}>현재 라이브 방송 중인 비디오가 없습니다.</p>
      ) : (
        <div className={styles.videoGrid}>
          {videos.map((video) => (
            <Link href={`/video/${video.id}`} key={video.id}>
              <div className={styles.videoCard}>
                <div className={styles.thumbnailContainer}>
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title}
                    width={320}
                    height={180}
                    className={styles.thumbnail}
                  />
                  {video.isLive && <span className={styles.liveTag}>LIVE</span>}
                </div>
                <div className={styles.videoInfo}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <p className={styles.channelName}>{video.channelName}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList; 