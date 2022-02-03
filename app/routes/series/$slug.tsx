import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { ImageGrid } from '~/components/ImageGrid';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { VideoBanner } from '~/components/VideoBanner/videoBanner';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllMessages } from '../messages/messages.loaders';
import { Message } from '../messages/messages.types';
import { getAllSeries } from './series.loader';
import { Series } from './series.types';

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
	const [currentSeries, setCurrentSeries] = useState<Series>();
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
						thumbnail: m.thumbnail,
					}))
				);
				setLatestMessage(data[0]);
			}
		}
		getMessages();
	}, [currentSeries]);

	useEffect(() => {
		setCurrentSeries(series.data.find(f => f.uid === current));
	}, [series]);

	return (
		<>
			<VideoBanner
				videoUrl={latestMessage?.video}
				title={currentSeries?.title || ''}
				subTitle={currentSeries?.description || ''}
			/>
			<ImageGrid
				title="In this series..."
				items={messages}
				theme={Theme.light}
			/>
			<Box p={10} w={'100%'} bg={'gray.300'}>
				<Heading as="h2" size={'md'}>
					Additional Resources
				</Heading>
				<Box paddingTop={2}>
					<List>
						{currentSeries?.resources?.map(resource => (
							<ListItem key={resource.title}>
								<a href={resource.url} target={'_blank'}>
									{resource.title}{' '}
									{resource.description && (
										<span> - {resource.description}</span>
									)}
								</a>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
			<ImageGrid
				title="Other Series..."
				items={series?.data.map(s => ({
					key: s.uid,
					link: `/series/${s.uid}`,
					title: s.title,
					thumbnail: s.thumbnail,
				}))}
				theme={Theme.light}
			/>
		</>
	);
}
