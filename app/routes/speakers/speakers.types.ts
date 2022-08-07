import { CmsImage, CmsText } from "~/types/cms.types";
import { RichTextField } from "@prismicio/types";

export type Speaker = {
  id: string;
  uid: string;
  name: string;
  bio: RichTextField;
  hero?: CmsImage;
  thumbnail?: CmsImage;
  role?: RichTextField;
};
