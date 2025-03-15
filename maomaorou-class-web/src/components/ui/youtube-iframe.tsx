type Props = {
  url: string;
};

export default function YoutubeIframe({ url }: Props) {
  return (
    <iframe
      className="w-full aspect-[4/3]"
      src={url}
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  );
}
