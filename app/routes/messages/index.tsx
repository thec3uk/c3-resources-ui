import { useEffect, useState } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { getSpeakers } from '../speakers/speakers.loader';
import { Speaker } from '../speakers/speakers.types';
import { getAllMessages } from './messages.loaders';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';
import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	SearchBox,
	Hits,
	RefinementList,
	connectRefinementList,
} from 'react-instantsearch-dom';
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Spacer,
	VStack,
} from '@chakra-ui/react';
import { SearchItem } from '~/components/SearchItem';
import dayjs from 'dayjs';
import { SearchIndexRecord } from '../search/search.types';

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

export interface IRefinementList {
	attribute: string;
	operator: string;
	showMore: boolean;
	limit: number;
	showMoreLimit: number;
	facetOrdering: boolean;
}

export interface FacetItem {
	label: string;
	value: Array<string>;
	count: number;
	isRefined: boolean;
}

const RefinementList = ({
	items,
	refine,
}: {
	items: Array<FacetItem>;
	refine: (arg: Array<string>) => {};
}) => {
	return items.map(m => (
		<Button
			bgColor={m.isRefined ? 'black' : 'grey'}
			color={m.isRefined ? 'white' : 'black'}
			key={m.label}
			ml={2}
			borderRadius={'20px'}
			id={m.label}
			onClick={e => {
				e.preventDefault();
				refine(m.value);
			}}
		>
			{m.label}
		</Button>
	));
};

const CustomRefinementList = connectRefinementList(RefinementList);

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
				<Flex p={5}>
					<VStack
						alignItems={'start'}
						spacing={4}
						display={['none', 'inherit', 'inherit']}
					>
						<CustomRefinementList attribute={'speakers'} />
					</VStack>
					<Hits hitComponent={Hit} />
				</Flex>
			</InstantSearch>
		</Box>
	);
}
