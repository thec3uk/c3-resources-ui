import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { Channels } from '~/components/Channels';
import { FeaturedChannel } from '~/components/FeaturedChannel';
import { ImageGrid } from '~/components/ImageGrid';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllMessages } from '../messages/messages.loaders';
import { getChannel } from './channels.loader';
import { Channel } from './channels.types';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
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
				data.map(m => ({
					key: m.uid,
					link: `/messages/${m.uid}`,
					title: m.title,
					thumbnail: m.thumbnail,
				}))
			);
		}
		getMessage();
	}, [featured]);

	return (
		<>
			<FeaturedChannel channel={featured} video={video} />
			{messages && (
				<ImageGrid
					title="Latest Videos..."
					items={messages
						.concat(messages)
						.concat(messages)
						.concat(messages)}
					theme={Theme.light}
				/>
			)}
		</>
	);
}
