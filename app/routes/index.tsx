import { Link, LoaderFunction, useLoaderData } from "remix";
import { ImageGrid } from "~/components/ImageGrid";
import { Theme } from "~/components/ImageGrid/imageGrid.types";
import { VideoBanner } from "~/components/VideoBanner/videoBanner";
import { getLatestMessage } from "~/routes/messages/messages.loaders";
import { GraphqlResponse } from "~/types/graphql.types";
import { getChannels } from "./channels/channels.loader";
import { Channel } from "./channels/channels.types";
import { Message } from "./messages/messages.types";
import { getAllSeries } from "./series/series.loader";
import { Series } from "./series/series.types";

export const loader: LoaderFunction = async () => {
  const latestMessageResponse = await getLatestMessage();
  const channelsResponse = await getChannels();
  const seriesResponse = await getAllSeries();
  return { latestMessageResponse, channelsResponse, seriesResponse };
};

export default function Index() {
  const { latestMessageResponse, channelsResponse, seriesResponse } = useLoaderData<{
    latestMessageResponse: GraphqlResponse<Message>;
    channelsResponse: GraphqlResponse<Array<Channel>>;
    seriesResponse: GraphqlResponse<Array<Series>>;
  }>();
  const { data: message } = latestMessageResponse;
  const { data: channels } = channelsResponse;
  const { data: series } = seriesResponse;

  return (
    <>
      <VideoBanner
        title={"Latest Series"}
        subTitle={message.series?.title}
        description={message.series?.description}
        callToAction={[
          {
            link: `/series/${message.series?.uid}`,
            title: "Latest Series",
          },
        ]}
        videoUrl={message.video}
      />

      <ImageGrid
        theme={Theme.dark}
        title="Channel"
        items={channels.map((channel) => ({
          key: channel.uid,
          link: `/channels/${channel.uid}`,
          title: channel.name,
          thumbnail: channel.thumbnail?.url,
        }))}
      />
      <ImageGrid
        title="Series"
        items={series.map((series) => ({
          key: series.uid,
          link: `/series/${series.uid}`,
          title: series.title,
          thumbnail: series.thumbnail?.url,
        }))}
      />
    </>
  );
}
