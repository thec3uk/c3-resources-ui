import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";
import { Channel } from "~/routes/channels/channels.types";
import { SearchIndexRecord } from "~/routes/search/search.types";
import { SearchItem } from "../SearchItem";

export function SearchHit({
  hit: message,
  playPreview,
  setPlayPreview,
}: {
  hit: SearchIndexRecord;
  playPreview: string;
  setPlayPreview: Dispatch<SetStateAction<string>>;
}) {
  return (
    <SearchItem
      key={message.id}
      box={{
        key: message.id,
        link: `/messages/${message.objectID}`,
        title: message.title,
        subTitle: message.speakers?.length ? message.speakers.join(", ") : dayjs(message.date).format("MMMM D, YYYY"),
        thumbnail: message.thumbnailUrl,
        trailer: message.trailerUrl,
        channel: message.channel,
      }}
      playPreview={playPreview}
      setPlayPreview={setPlayPreview}
    />
  );
}
