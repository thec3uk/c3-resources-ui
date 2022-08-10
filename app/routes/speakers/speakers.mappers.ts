import { CmsSpeaker, getUid, getText, getId, CmsText } from "~/types/cms.types";
import { Speaker } from "./speakers.types";
import { RichTextField } from "@prismicio/types";

export function mapSpeaker(speaker: CmsSpeaker): Speaker {
  return {
    id: getId(speaker),
    uid: getUid(speaker),
    name: getText(speaker.name),
    thumbnail: speaker.thumbnail,
    hero: speaker.hero,
    role: speaker.role as RichTextField,
    bio: speaker.bio as RichTextField,
  };
}

export function mapSpeakers(cmsSpeakers?: Array<{ speaker: CmsSpeaker }>): Array<Speaker> | undefined {
  return cmsSpeakers
    ?.filter((link) => link.speaker !== null)
    ?.map((link: { speaker: CmsSpeaker }) => mapSpeaker(link?.speaker));
}
