import { RichTextField } from "@prismicio/types";
import { CmsImage } from "~/types/cms.types";

export interface Resource {
  title: string;
  description: string;
  url: string;
}

export interface Series {
  id: string;
  uid: string;
  title: string;
  description: RichTextField;
  hero?: CmsImage;
  thumbnail?: CmsImage;
  resources?: Array<Resource>;
}
