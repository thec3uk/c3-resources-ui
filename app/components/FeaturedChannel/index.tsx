import YouTubePlayer from "react-player/youtube";
import { Channel } from "~/routes/channels/channels.types";
import { VideoBanner } from "../VideoBanner/videoBanner";

import { PrismicRichText } from "@prismicio/react";
import { Speaker } from "~/routes/speakers/speakers.types";
import { layout, components } from "../components";

export function FeaturedChannel({ channel, video }: { channel: Channel; video: string | undefined }) {
  // fallback with an image?
  const background = <YouTubePlayer url={video} />;
  return (
    <layout.Hero background={background}>
      <img src={channel.thumbnail?.url} className="w-20 rounded-full" />
      <h1 className="font-title font-bold text-5.5xl lowercase">{channel.name}</h1>
      {/* <div className="mt-2 font-sans text-3xl">
        <PrismicRichText field={speaker.role} />
      </div> */}
      <div className="px-2 py-2 mt-8 -mx-2 text-2xl">
        <PrismicRichText field={channel.description} />
      </div>
      <div className="flex flex-col mt-8 space-y-4 text-2xl"></div>
    </layout.Hero>
  );
}
