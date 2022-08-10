import dayjs from "dayjs";
import { Message } from "../../routes/messages/messages.types";
import { SpeakerLink } from "../SpeakerLink";
import { ResponsiveVideo } from "../ResponsiveVideo";
import { layout } from "../components";
import { PrismicRichText } from "@prismicio/react";

export function MessageLayout({ message, playing }: { message: Message; playing: boolean }) {
  const background = (
    <div className="space-y-2">
      {message.video && <ResponsiveVideo video={message.video} />}
      {message?.podcast && <div dangerouslySetInnerHTML={{ __html: message.podcast }}></div>}
    </div>
  );
  return (
    <layout.Hero background={background}>
      {/* <img src={channel.thumbnail?.url} className="w-20 rounded-full" /> */}
      <h1 className="font-title font-bold text-5.5xl lowercase">{message.title}</h1>
      <div className="mt-2 font-sans text-3xl">{dayjs(message.date).format("DD MMMM, YYYY")}</div>
      <div className="px-2 py-2 mt-8 -mx-2 text-2xl">
        {/* <PrismicRichText field={channel.description} /> */}
        {message.speakers?.map((speaker) => (
          <SpeakerLink key={speaker.id} speaker={speaker} />
        ))}
      </div>
      <div className="flex flex-col mt-8 space-y-4 text-2xl"></div>
    </layout.Hero>
  );
}
