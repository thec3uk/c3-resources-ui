import { Box, Text, Flex, Heading, Image } from '@chakra-ui/react';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { GraphqlResponse } from '~/types/graphql.types';
import { getChannels } from './channels.loader';
import { Channel } from './channels.types';

export const loader: LoaderFunction = async () => {
	return getChannels();
};

export default function AllChannels() {
	const {
		data: allChannels,
		loading,
		errors,
	} = useLoaderData<GraphqlResponse<Array<Channel>>>();
	return (
		<div>
			{!loading && !errors && (
				<div>
					{allChannels.map(channel => {
						return (
							<Box padding="3" key={channel.id}>
								<Link to={`/series/${channel.id}`}>
									<Heading as="h4" size="md">
										{channel.name}
									</Heading>
								</Link>
								<Flex>
									<Image
										src={channel.thumbnail?.url}
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
