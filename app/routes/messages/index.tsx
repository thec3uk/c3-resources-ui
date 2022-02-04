import { SearchIcon } from '@chakra-ui/icons';
import * as react from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { SearchBar } from '~/components/SearchBar';
import { SearchFacets } from '~/components/SearchFacets';
import { SearchGrid } from '~/components/SearchGrid';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeakers } from '../speakers/speakers.loader';
import { Speaker } from '../speakers/speakers.types';
import { getAllMessages } from './messages.loaders';
import { Message } from './messages.types';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';

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
	return {
		allMessages: await getAllMessages({}),
		searchTerm: url.searchParams.get('q'),
	};
};

export default function Messages() {
	const { allMessages, searchTerm } = useLoaderData<{
		allMessages: GraphqlResponse<Array<Message>>;
		searchTerm: string;
	}>();

	const [speakers, setSpeakers] = useState<Array<Speaker>>();
	const [searchResults] = useState<Array<Message>>(allMessages.data);
	const [searchText, setSearchText] = useState<string>(searchTerm || '');

	useEffect(() => {
		async function loadSpeakers() {
			const { data } = await getSpeakers();
			setSpeakers(data);
		}
		loadSpeakers();
	}, []);

	return (
		<>
			<SearchBar searchTerm={searchText} onChange={setSearchText} />
			<react.Flex p={5}>
				<SearchFacets speakers={speakers} />
				<SearchGrid messages={searchResults} />
			</react.Flex>
		</>
	);
}
