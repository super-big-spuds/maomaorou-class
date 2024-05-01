"use client";

type Props = {
  url: string;
};

export default function BlockedDownloadVideo({ url }: Props) {
  const regex = /.*\.s3(.*)\.amazonaws\.com/;
  const newGroupValue = "-accelerate";

  const match = regex.exec(url);

  function getAwsReplacedUrl() {
    if (match) {
      const replacedText = url.replace(regex, function (match, group1) {
        return `${match.slice(
          0,
          match.indexOf(group1)
        )}${newGroupValue}${match.slice(match.indexOf(group1) + group1.length)}`;
      });
      return replacedText;
    }

    return url;
  }

  return (
    <video
      controls
      controlsList="nodownload"
      preload="metadata"
      onContextMenu={(e) => e.preventDefault()}
    >
      <source src={getAwsReplacedUrl()} type="video/mp4" />
      您的瀏覽器不支援線上撥放影片
    </video>
  );
}
