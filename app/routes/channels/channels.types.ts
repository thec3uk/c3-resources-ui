import { RichTextField } from "@prismicio/types";
import { CmsImage } from "~/types/cms.types";

export type Links = {
  facebook: string;
  instagram: string;
  youtube: string;
};

export type Channel = {
  id: string;
  uid: string;
  name: string;
  description: RichTextField;
  hero?: CmsImage;
  thumbnail?: CmsImage;
  social_media?: Array<Links>;
};
