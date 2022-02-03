import { SearchIcon } from '@chakra-ui/icons';
import * as react from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import { ImageBox } from '~/components/ImageBox';
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

	const [selectedSpeakers, setSelectedSpeakers] = useState<Array<string>>([]);
	const [speakers, setSpeakers] = useState<Array<Speaker>>();
	const [searchResults, setSearchResults] = useState<Array<Message>>(
		allMessages.data
	);
	const [searchText, setSearchTerm] = useState<string>(searchTerm || '');

	useEffect(() => {
		async function loadSpeakers() {
			const { data } = await getSpeakers();
			setSpeakers(data);
		}
		loadSpeakers();
	}, []);
	useEffect(() => {
		// filter here
	}, [selectedSpeakers]);

	return (
		<>
			<react.HStack p={4}>
				<react.Heading as="h1" size="lg">
					Messages
				</react.Heading>
				<react.Spacer />
				<react.InputGroup maxW={'30%'}>
					<react.InputLeftElement
						pointerEvents="none"
						children={<SearchIcon color="gray.300" />}
					/>
					<react.Input
						type="tel"
						value={searchText}
						placeholder="Search messages..."
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</react.InputGroup>
			</react.HStack>
			<react.HStack p={4}>
				<react.VStack
					alignItems={'start'}
					spacing={4}
					display={['none', 'inherit', 'inherit']}
				>
					<react.Heading as="h2" size={'sm'}>
						Speakers
					</react.Heading>
					<react.InputGroup>
						<react.InputLeftElement
							children={<SearchIcon color="gray.300" />}
						/>
						<react.Input
							type="input"
							placeholder="Search speakers..."
						/>
					</react.InputGroup>
					{speakers?.map(s => (
						<react.Button
							key={s.id}
							ml={2}
							borderRadius={'20px'}
							bg={
								selectedSpeakers?.find(f => f === s.id)
									? 'blackAlpha.700'
									: 'gray.100'
							}
							color={
								selectedSpeakers?.find(f => f === s.id)
									? 'white'
									: 'black'
							}
							id={s.id}
							onClick={() => {
								if (selectedSpeakers?.find(f => f === s.id)) {
									setSelectedSpeakers(
										selectedSpeakers.filter(f => f !== s.id)
									);
								} else {
									setSelectedSpeakers(
										selectedSpeakers?.concat([s.id])
									);
								}
							}}
						>
							{s.name}
						</react.Button>
					))}
				</react.VStack>
				<react.SimpleGrid
					minChildWidth={'150px'}
					width={'full'}
					spacing="40px"
				>
					{searchResults.map(message => {
						return (
							<ImageBox
								key={message.id}
								box={{
									key: message.id,
									link: `/messages/${message.uid}`,
									title: message.title,
									subTitle: message.speakers?.length
										? message.speakers[0].name
										: dayjs(message.date).format(
												'MMMM D, YYYY'
										  ),
									thumbnail: message.thumbnail,
								}}
							/>
						);
					})}
				</react.SimpleGrid>
			</react.HStack>
		</>
	);
}
