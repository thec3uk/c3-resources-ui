import { Channel } from "~/routes/channels/channels.types";

export interface IImageBoxProps {
  key: string;
  link: string;
  title: string;
  thumbnail?: string;
  subTitle?: string;
  trailer?: string;
  channel?: Channel;
}

export enum Theme {
  light,
  dark,
}
