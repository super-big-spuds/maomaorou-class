"use client";

type Props = {
  url: string;
};

export default function BlockedDownloadVideo({ url }: Props) {
  return (
    <video
      controls
      controlsList="nodownload"
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={url} type="video/mp4" />
      您的瀏覽器不支援線上撥放影片
    </video>
  );
}
