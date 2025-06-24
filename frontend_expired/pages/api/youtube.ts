import { NextApiRequest, NextApiResponse } from 'next';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const LV_ACADEMY_CHANNEL_ID = 'YOUR_LV_ACADEMY_CHANNEL_ID';
const TODDLER_CHANNEL_ID = 'YOUR_TODDLER_CHANNEL_ID';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { channelId } = req.query;
    
    if (!channelId) {
      return res.status(400).json({ message: 'Channel ID is required' });
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
    }));

    res.status(200).json(videos);
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ message: 'Failed to fetch YouTube videos' });
  }
} 