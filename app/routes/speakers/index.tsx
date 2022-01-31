import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeakers } from './speakers.loader';
import { Speaker } from './speakers.types';

export const loader: LoaderFunction = async () => {
	return getSpeakers();
};

export default function Speakers() {
	const {
		data: speakers,
		loading,
		errors,
	} = useLoaderData<GraphqlResponse<Array<Speaker>>>();
	return (
		<div>
			<h1>Speakers</h1>
			{!loading && !errors && (
				<div>
					{speakers.map(m => {
						return (
							<Box padding="3">
								<Flex>
									<Heading as="h4" size="md">
										{m.name}
									</Heading>
									<Text size="sm"> - {m.role}</Text>
								</Flex>
								<Flex>
									<Text>{m.bio}</Text>
									<Image
										src={m.thumbnail?.url}
										borderRadius="full"
										boxSize="150px"
									></Image>
								</Flex>
							</Box>
						);
					})}
				</div>
			)}
		</div>
	);
}
