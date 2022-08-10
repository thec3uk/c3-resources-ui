import { PrismicRichText } from "@prismicio/react";
import { RichTextField } from "@prismicio/types";
import { useState } from "react";
import { Link } from "remix";
import { components, layout } from "../components";
import { Theme } from "../ImageGrid/imageGrid.types";
import { ResponsiveVideo } from "../ResponsiveVideo";

const commonLinkClasses =
  "bg-gradient-to-r bg-underline font-semibold bg-p-full bg-no-repeat w-max pl-0.5 pr-1 duration-300 hover:bg-p-zero hover-hover:pointer-fine:hover:bg-p-zero cursor-pointer transition-bg-position no-underline";

export interface IVideoBannerProps {
  videoUrl?: string;
  title: string;
  subTitle?: string;
  description?: RichTextField;
  callToAction?: [
    {
      link: string;
      title: string;
    }
  ];
  image?: string;
  theme?: Theme;
}

export function VideoBanner({ videoUrl, title, subTitle, description, callToAction, image }: IVideoBannerProps) {
  const [autoPlay, setAutoplay] = useState<boolean>(false);

  // fallback ought to be an image
  const background = videoUrl ? <ResponsiveVideo video={videoUrl} playing={autoPlay} /> : <div></div>;
  return (
    <layout.Hero background={background} fullbleed={false}>
      <h1 className="font-title font-bold text-5.5xl lowercase">{title}</h1>
      <div className="mt-4 font-sans text-xl">
        <PrismicRichText field={description} />
      </div>
      <div className="px-2 py-2 mt-8 -mx-2 text-2xl text-white bg-black">
        <h2>{subTitle}</h2>
      </div>
      {callToAction &&
        callToAction.map((cta) => (
          <div className="flex flex-col mt-8 space-y-4 text-2xl truncate" key={cta.link}>
            <Link to={cta?.link as string} className={`${commonLinkClasses} from-red-500-full to-black-full`}>
              {/* switch out button for something else */}
              {cta?.title}
            </Link>
          </div>
        ))}
    </layout.Hero>
  );
}
