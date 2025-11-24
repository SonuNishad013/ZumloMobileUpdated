export const getThumbnailFromYoutubeURL = (url: any) => {
  const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = url?.match(regex);
  let videoId = match ? match[1] : null;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return thumbnailUrl;
};
