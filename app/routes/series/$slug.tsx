import { Heading, HStack, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { AdditionalResources } from '~/components/AdditionalResources';
import { ImageGrid } from '~/components/ImageGrid';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { Section } from '~/components/Section';
import { VideoBanner } from '~/components/VideoBanner/videoBanner';
import { GraphqlResponse } from '~/types/graphql.types';
import { Handle } from '~/utils/sitemap.server';
import { getAllMessages } from '../messages/messages.loaders';
import { Message } from '../messages/messages.types';
import { getAllSeries } from './series.loader';
import { Series } from './series.types';

export const handle: Handle = {
	getSitemapEntries: () => null,
};

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return {
		current: params.slug,
		series: await getAllSeries(),
	};
};

export default function SeriesPage() {
	const { current, series } = useLoaderData<{
		current: string;
		series: GraphqlResponse<Array<Series>>;
	}>();
	const [currentSeries, setCurrentSeries] = useState<Series>(series.data[0]);
	const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);
	const [latestMessage, setLatestMessage] = useState<Message>();
	useEffect(() => {
		async function getMessages() {
			if (currentSeries) {
				const { data } = await getAllMessages({
					seriesId: currentSeries.id,
				});
				setMessages(
					data.map(m => ({
						key: m.uid,
						link: `/messages/${m.uid}`,
						title: m.title,
						thumbnail: m.thumbnail.url,
					}))
				);
				setLatestMessage(data[0]);
			}
		}
		getMessages();
	}, [currentSeries]);

	useEffect(() => {
		setCurrentSeries(
			series.data.find(f => f.uid === current) || series.data[0]
		);
	}, [series]);

	return (
		<>
			{latestMessage ? (
				<VideoBanner
					videoUrl={latestMessage?.video}
					title={currentSeries?.title}
					description={currentSeries?.description}
				/>
			) : (
				<Section theme={Theme.light}>
					<HStack justifyContent={'space-between'}>
						<Heading size={'lg'} as="h2">
							{currentSeries.title}
						</Heading>
						<Image
							src={currentSeries.thumbnail?.url}
							w={'256px'}
						></Image>
					</HStack>
				</Section>
			)}
			{messages.length ? (
				<ImageGrid
					title="In this series..."
					items={messages}
					theme={Theme.dark}
					link={{
						label: 'View all',
						url: `/messages?series=${currentSeries.title}`,
					}}
				/>
			) : (
				<></>
			)}
			{currentSeries.resources?.length ? (
				<AdditionalResources resources={currentSeries.resources} />
			) : (
				<></>
			)}
			<ImageGrid
				title="Other Series..."
				items={series?.data.map(s => ({
					key: s.uid,
					link: `/series/${s.uid}`,
					title: s.title,
					thumbnail: s.thumbnail?.url,
				}))}
				theme={Theme.dark}
			/>
		</>
	);
}
