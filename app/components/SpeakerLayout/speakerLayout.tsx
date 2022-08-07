import { PrismicRichText } from "@prismicio/react";
import { Speaker } from "~/routes/speakers/speakers.types";
import { layout, components } from "../components";

export default function SpeakerLayout({ speaker }: { speaker: Speaker }) {
  const background = <img src={speaker.hero?.url} alt={speaker.hero?.alt} />;
  return (
    <layout.Hero background={background} fullbleed>
      <h1 className="font-title font-bold text-5.5xl lowercase">{speaker.name}</h1>
      <div className="mt-2 font-sans text-3xl">
        <PrismicRichText field={speaker.role} />
      </div>
      <div className="px-2 py-2 mt-8 -mx-2 text-2xl">
        <PrismicRichText field={speaker.bio} />
      </div>
      <div className="flex flex-col mt-8 space-y-4 text-2xl"></div>
    </layout.Hero>
  );
}
