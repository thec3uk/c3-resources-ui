import ReactPlayer from "react-player";

export function ResponsiveVideo({
  video,
  playing = false,
  volume = 100,
}: {
  video: string;
  playing?: boolean;
  volume?: number;
}) {
  return (
    <div>
      <div className="relative shadow-md player-wrapper pt-[60%]">
        <ReactPlayer
          url={video}
          className="react-player"
          playing={playing}
          width="100%"
          height="100%"
          volume={volume}
        />
      </div>
    </div>
  );
}
