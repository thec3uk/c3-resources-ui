import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { getAllMessages } from './messages.loaders';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import { Box, Flex, Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { SearchItem } from '~/components/SearchItem';
import dayjs from 'dayjs';
import { SearchIndexRecord } from '../search/search.types';
import { CustomRefinementList } from '~/components/SearchFacetList';
import _ from 'lodash';

const searchClient = algoliasearch(
	'I2N55PC133',
	'c7d06d28a18680f32bb377222c532d26'
);

export const handle: Handle = {
	getSitemapEntries: async () => {
		const messages = await getAllMessages({});
		const entries: Array<SitemapEntry> = [
			{
				route: `/messages`,
				priority: 0.5,
			},
		];
		messages.data.map(m =>
			entries.push({
				route: `/messages/${m.uid}`,
				priority: 0.4,
			})
		);
		return entries;
	},
};

export const meta: MetaFunction = () => {
	return {
		title: 'Latest messages - The C3 Church',
		description: 'Catch up on the latest messages',
	};
};

interface SearchQueryParams {
	channel?: string;
	series?: string;
	speaker?: string;
	query?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
	let url = new URL(request.url);
	return {
		query: url.searchParams.get('q'),
		speakers: url.searchParams.get('series'),
		channel: url.searchParams.get('channel'),
		series: url.searchParams.get('series'),
	};
};

function Hit({ hit: message }: { hit: SearchIndexRecord }) {
	return (
		<SearchItem
			key={message.id}
			box={{
				key: message.id,
				link: `/messages/${message.objectID}`,
				title: message.title,
				subTitle: message.speakers?.length
					? message.speakers.join(', ')
					: dayjs(message.date).format('MMMM D, YYYY'),
				thumbnail: message.thumbnailUrl,
				trailer: message.trailerUrl,
			}}
		/>
	);
}

export default function Messages() {
	const queryParams = useLoaderData<SearchQueryParams>();

	return (
		<Box p={5}>
			<InstantSearch indexName="c3_resources" searchClient={searchClient}>
				<HStack p={4}>
					<Heading
						as="h1"
						size="lg"
						display={['none', 'inherit', 'inherit']}
					>
						Messages
					</Heading>
					<Spacer />
					<SearchBox
						autoFocus
						defaultRefinement={queryParams?.query}
					/>
				</HStack>
				<Flex p={5}>
					<VStack
						alignItems={'start'}
						spacing={4}
						display={['none', 'inherit', 'inherit']}
					>
						<CustomRefinementList
							attribute={'speakers'}
							title={'Speakers'}
							defaultRefinement={
								queryParams.speaker ? [queryParams.speaker] : []
							}
							searchable
						/>
						<CustomRefinementList
							attribute={'channel'}
							title={'Channels'}
							defaultRefinement={
								queryParams?.channel
									? [queryParams.channel]
									: []
							}
							searchable
						/>
						<CustomRefinementList
							attribute={'series'}
							title={'Series'}
							defaultRefinement={
								queryParams?.series ? [queryParams.series] : []
							}
							searchable
						/>
					</VStack>
					<Hits hitComponent={Hit} />
				</Flex>
			</InstantSearch>
		</Box>
	);
}
