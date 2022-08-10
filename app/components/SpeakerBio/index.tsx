import { PrismicRichText } from "@prismicio/react";
import { Speaker } from "~/routes/speakers/speakers.types";
import { layout, components } from "../components";

export function SpeakerBio({ speaker }: { speaker: Speaker }) {
  return (
    <layout.Main hash={""}>
      <components.Card
        colour="white"
        title={"Speaker Bio"}
        subtitle={speaker.name}
        image={speaker.thumbnail?.url}
        cta={`More from ${speaker.name}`}
        to={`/speakers/${speaker.uid}`}>
        <PrismicRichText field={speaker.bio} />
      </components.Card>
    </layout.Main>
  );
}
