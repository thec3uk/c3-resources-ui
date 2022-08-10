import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "remix";
import { IImageBoxProps } from "../ImageGrid/imageGrid.types";
import { ResponsiveVideo } from "../ResponsiveVideo";

export function SearchItem({
  box,
  playPreview,
  setPlayPreview,
}: {
  box: IImageBoxProps;
  playPreview: string;
  setPlayPreview: Dispatch<SetStateAction<string>>;
}) {
  const [playPreviewMsg, setPlayPreviewMsg] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => {
        setPlayPreviewMsg(true);
        setTimeout(() => {
          setPlayPreview(box.key);
        }, 1000);
      }}
      onMouseLeave={() => {
        setPlayPreview("");
        setPlayPreviewMsg(false);
      }}>
      {playPreview === box.key && box.trailer ? (
        <div className="min-h-[250px] min-w-full transition-all duration-500 scale-125">
          <ResponsiveVideo video={`${box.trailer}autoplay=1`} playing volume={0} />
        </div>
      ) : (
        <Link to={box.link}>
          <div
            className={`border rounded-lg border-gray-300 lg:m-2 min-w-full min-h-[250px] bg-cover overflow-hidden`}
            //   bg-[url('${box.thumbnail}')]
            style={{
              backgroundImage: `url('${box.thumbnail}')`,
            }}>
            {playPreviewMsg && box.trailer && (
              <span className="absolute px-2 py-1 m-2 text-xs text-white bg-black rounded">Keep hovering to play</span>
            )}
          </div>
        </Link>
      )}
      <div className="flex items-center mt-2 mb-4 space-x-2">
        <Link to={`/channels/${box.channel?.uid}`}>
          <img src={box.channel?.thumbnail?.url} className="w-8 mx-2 rounded-full" />
        </Link>
        <Link to={box.link}>
          <h4 className="font-semibold leading-tight text-black">{box.title}</h4>
          <h6 className="leading-tight text-gray-500">
            {box.channel?.name}
            {box.channel?.name && box.subTitle && " - "}
            {box.subTitle}
          </h6>
        </Link>
      </div>
    </div>
  );
}
