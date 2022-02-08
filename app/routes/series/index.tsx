import { useState, useEffect } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import { ImageGrid } from '~/components/ImageGrid';
import { Theme } from '~/components/ImageGrid/imageGrid.types';
import { Section } from '~/components/Section';
import { VideoBanner } from '~/components/VideoBanner/videoBanner';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllMessages } from '../messages/messages.loaders';
import { Message } from '../messages/messages.types';
import { getAllSeries } from './series.loader';
import { Series } from './series.types';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';

export const handle: Handle = {
	getSitemapEntries: async () => {
		const series = await getAllSeries();
		const entries: Array<SitemapEntry> = [
			{
				route: `/series`,
				priority: 0.5,
			},
		];
		series.data.map(m =>
			entries.push({
				route: `/series/${m.uid}`,
				priority: 0.4,
			})
		);
		return entries;
	},
};

export const loader: LoaderFunction = async () => {
	return getAllSeries();
};

export default function AllSeries() {
	const { data: allSeries } = useLoaderData<GraphqlResponse<Array<Series>>>();
	const [latestMessage, setLatestMessage] = useState<Message>();
	const [latestSeries] = useState<Series>(allSeries[0]);

	useEffect(() => {
		async function getMessages() {
			const { data } = await getAllMessages({
				seriesId: latestSeries.id,
			});
			setLatestMessage(data[0]);
		}
		getMessages();
	}, [latestSeries]);
	return (
		<>
			<VideoBanner
				videoUrl={latestMessage?.trailer || latestMessage?.video}
				title={latestSeries.title}
				description={latestSeries.description}
				callToAction={{
					link: `/series/${latestSeries.uid}`,
					title: 'View Series Page',
				}}
			/>
			<ImageGrid
				theme={Theme.dark}
				title="Browse Series"
				items={allSeries.map(series => ({
					key: series.uid,
					link: `/series/${series.uid}`,
					title: series.title,
					thumbnail: series.thumbnail?.url,
				}))}
			/>
		</>
	);
}
