import { CmsChannel } from "~/types/cms.types";
import { Channel } from "../channels/channels.types";

export interface SearchIndexRecord {
  id: string;
  objectID: string;
  title: string;
  description: string;
  date: string;
  thumbnailUrl: string;
  speakers?: Array<string>;
  trailerUrl: string;
  channel?: Channel;
  series?: string;
}
