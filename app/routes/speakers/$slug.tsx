import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import SpeakerLayout from "~/components/SpeakerLayout/speakerLayout";
import { Speaker } from "./speakers.types";
import { GraphqlResponse } from "~/types/graphql.types";
import { getSpeaker } from "./speakers.loader";
import { ImageGrid } from "~/components/ImageGrid";
import { getAllMessages } from "../messages/messages.loaders";
import { useEffect, useState } from "react";
import { IImageBoxProps } from "~/components/ImageGrid/imageGrid.types";
import { layout } from "~/components/components";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getSpeaker(params.slug);
};

export default function SpeakerPage() {
  const { data: speaker } = useLoaderData<GraphqlResponse<Speaker>>();
  const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);

  useEffect(() => {
    async function getMessage() {
      const { data } = await getAllMessages({
        speakerId: speaker.id,
      });
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
  }, [speaker]);
  return (
    <>
      <SpeakerLayout speaker={speaker} />
      <layout.Main hash={"latest"}>
        <h2 className="mb-8 text-4xl">The latest messages from {speaker.name}</h2>
      </layout.Main>

      <ImageGrid items={messages} title={`Message`} />
    </>
  );
}
