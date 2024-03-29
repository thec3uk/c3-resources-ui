import { useEffect, useState } from "react";
import { LoaderFunction, useLoaderData, useNavigate } from "remix";
import invariant from "tiny-invariant";
import { layout } from "~/components/components";
import { FeaturedChannel } from "~/components/FeaturedChannel";
import { ImageGrid } from "~/components/ImageGrid";
import { IImageBoxProps, Theme } from "~/components/ImageGrid/imageGrid.types";
import { SearchBar } from "~/components/SearchBar";
import { GraphqlResponse } from "~/types/graphql.types";
import { getAllMessages } from "../messages/messages.loaders";
import { getChannel } from "./channels.loader";
import { Channel } from "./channels.types";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getChannel(params.slug);
};

export default function ChannelPage() {
  const { data: featured } = useLoaderData<GraphqlResponse<Channel>>();
  const [video, setVideo] = useState<string | undefined>();
  const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);

  useEffect(() => {
    async function getMessage() {
      const { data } = await getAllMessages({
        channelId: featured.id,
      });
      setVideo(data[0].video);
      setMessages(
        data.map((m) => ({
          key: m.uid,
          link: `/messages/${m.uid}`,
          title: m.title,
          thumbnail: m.thumbnail.url,
        }))
      );
    }
    getMessage();
  }, [featured]);

  let navigate = useNavigate();
  const navigateToSearch = (e: string) => navigate(`/messages?channel=${featured.name}&q=${e}`);

  return (
    <>
      {/* <SearchBar
        title={""}
        link={`/messages?channel=${featured.name}`}
        placeholder={`Search messages from ${featured.name}`}
      /> */}
      <FeaturedChannel channel={featured} video={video} />
      <layout.Main hash={"latest"}>
        <h2 className="mb-8 text-4xl">Our latest videos</h2>
      </layout.Main>
      {messages && <ImageGrid title="" items={messages} theme={Theme.light} />}
    </>
  );
}
