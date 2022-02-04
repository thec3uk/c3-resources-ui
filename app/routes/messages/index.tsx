import { SearchIcon } from '@chakra-ui/icons';
import {
	HStack,
	Heading,
	Spacer,
	InputGroup,
	InputLeftElement,
	Input,
	VStack,
	Button,
	SimpleGrid,
	Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import { ImageBox } from '~/components/ImageBox';
import { SearchBar } from '~/components/SearchBar';
import { SearchFacets } from '~/components/SearchFacets';
import { SearchGrid } from '~/components/SearchGrid';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeakers } from '../speakers/speakers.loader';
import { Speaker } from '../speakers/speakers.types';
import { getAllMessages } from './messages.loaders';
import { Message } from './messages.types';

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
			<Flex p={5}>
				<SearchFacets speakers={speakers} />
				<SearchGrid messages={searchResults} />
			</Flex>
		</>
	);
}
