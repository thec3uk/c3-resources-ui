import { Heading, HStack, Image, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { AdditionalResources } from '~/components/AdditionalResources';
import { ImageGrid } from '~/components/ImageGrid';
import { Theme } from '~/components/ImageGrid/imageGrid.types';
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
	const series = await getAllSeries();
	const seriesId = series.data.find(f => f.uid == params.slug)?.id;
	let messages;
	if (seriesId) {
		messages = await getAllMessages({
			seriesId: seriesId,
			limit: 4,
		});
	}

	return { series, messages, current: params.slug };
};

export default function SeriesPage() {
	const { series, messages, current } = useLoaderData<{
		series: GraphqlResponse<Array<Series>>;
		messages: GraphqlResponse<Array<Message>>;
		current: string;
	}>();
	const currentSeries =
		series.data.find(f => f.uid === current) || series.data[0];
	const [otherSeries, setOtherSeries] = useState<Array<Series>>();
	useEffect(() => {
		setOtherSeries(series.data.filter(f => f.uid !== current));
	}, [currentSeries]);

	const getMoreSeries = () => {
		console.log('load more');
	};
	return (
		<>
			{messages.data.length ? (
				<VideoBanner
					videoUrl={messages.data[0].video}
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
			{messages.data.length ? (
				<ImageGrid
					title="In this series..."
					items={messages.data.map(m => ({
						key: m.uid,
						link: `/messages/${m.uid}`,
						title: m.title,
						thumbnail: m.thumbnail.url,
					}))}
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
			{otherSeries && (
				<>
					<ImageGrid
						title="Other Series..."
						items={otherSeries?.map(s => ({
							key: s.uid,
							link: `/series/${s.uid}`,
							title: s.title,
							thumbnail: s.thumbnail?.url,
						}))}
						theme={Theme.dark}
						link={{
							label: 'View All',
							url: '/series',
						}}
					/>
				</>
			)}
		</>
	);
}
