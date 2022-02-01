import { Box, Text, Flex, Heading, Image } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { GraphqlResponse } from '~/types/graphql.types';
import { getChannel } from './channels.loader';
import { Channel } from './channels.types';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getChannel(params.slug);
};

export default function ChannelsPage() {
	const { data: channel } = useLoaderData<GraphqlResponse<Channel>>();
	return (
		<>
			<Box padding="3">
				<Heading as="h4" size="md">
					{channel.name}
				</Heading>
				<Flex>
					<Text>{channel.description}</Text>
					<Image src={channel.thumbnail?.url} boxSize="150px"></Image>
				</Flex>
			</Box>
		</>
	);
}
