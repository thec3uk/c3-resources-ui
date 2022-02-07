import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { Channels } from '~/components/Channels';
import { FeaturedChannel } from '~/components/FeaturedChannel';
import { ImageGrid } from '~/components/ImageGrid';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { SearchBar } from '~/components/SearchBar';
import { GraphqlResponse } from '~/types/graphql.types';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';
import { getAllMessages } from '../messages/messages.loaders';
import { getChannels } from './channels.loader';
import { Channel } from './channels.types';

export const handle: Handle = {
	getSitemapEntries: async () => {
		const entries: Array<SitemapEntry> = [
			{
				route: `/channels`,
				priority: 0.5,
			},
		];
		const channels = await getChannels();
		channels.data.map(m => {
			entries.push({
				route: `/channels/${m.uid}`,
				priority: 0.4,
			});
		});
		return entries;
	},
};

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
					thumbnail: m.thumbnail.url,
					subTitle: m.date,
				}))
			);
		}
		getMessage();
	}, [featured]);

	let navigate = useNavigate();
	const navigateToSearch = (e: string) =>
		navigate(`/messages?channel=${featured.name}&q=${e}`);

	return (
		<>
			<SearchBar
				title=""
				searchTerm={''}
				onChange={e => navigateToSearch(e)}
			/>
			<FeaturedChannel channel={featured} video={video} />
			{messages && (
				<ImageGrid
					title="Latest Videos..."
					items={messages}
					theme={Theme.light}
				/>
			)}
			<Channels channels={data} theme={Theme.dark} />
		</>
	);
}
