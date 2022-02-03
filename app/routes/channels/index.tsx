import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import YouTubePlayer from 'react-player/youtube';
import { LoaderFunction, useLoaderData } from 'remix';
import { Channels } from '~/components/Channels';
import { FeaturedChannel } from '~/components/FeaturedChannel';
import { ImageGrid } from '~/components/ImageGrid';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllMessages } from '../messages/messages.loaders';
import { getChannels } from './channels.loader';
import { Channel } from './channels.types';

export const loader: LoaderFunction = async () => {
	return getChannels();
};

export default function ChannelsPage() {
	const { data } = useLoaderData<GraphqlResponse<Array<Channel>>>();
	const [featured] = useState<Channel>(
		data.find(f => f.uid === 'c3-kids') || data[0]
	);

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
			<Channels channels={data} theme={Theme.dark} />
		</>
	);
}
