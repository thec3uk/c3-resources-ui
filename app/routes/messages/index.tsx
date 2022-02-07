import { useEffect, useState } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { SearchFacets } from '~/components/SearchFacets';
import { getSpeakers } from '../speakers/speakers.loader';
import { Speaker } from '../speakers/speakers.types';
import { getAllMessages } from './messages.loaders';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import {
	Box,
	Flex,
	Heading,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
	Spacer,
} from '@chakra-ui/react';
import { SearchItem } from '~/components/SearchItem';
import dayjs from 'dayjs';
import { SearchIndexRecord } from '../search/search.types';
import { SearchIcon } from '@chakra-ui/icons';

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

export const loader: LoaderFunction = async ({ request }) => {
	let url = new URL(request.url);
	return url.searchParams.get('q');
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
	const searchTerm = useLoaderData<string>();
	const [speakers, setSpeakers] = useState<Array<Speaker>>();

	useEffect(() => {
		async function loadSpeakers() {
			const { data } = await getSpeakers();
			setSpeakers(data);
		}
		loadSpeakers();
	}, []);

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
					<SearchBox autoFocus defaultRefinement={searchTerm} />
				</HStack>
				<Flex>
					{/* <SearchFacets speakers={speakers} /> */}
					<Hits hitComponent={Hit} />
				</Flex>
			</InstantSearch>
		</Box>
	);
}
