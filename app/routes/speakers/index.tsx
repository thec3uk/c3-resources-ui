import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import { ImageGrid } from '~/components/ImageGrid';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeakers } from './speakers.loader';
import { Speaker } from './speakers.types';

export const loader: LoaderFunction = async () => {
	return getSpeakers();
};

export default function Speakers() {
	const { data: speakers } = useLoaderData<GraphqlResponse<Array<Speaker>>>();
	return (
		<ImageGrid
			title="Speakers"
			items={speakers.map(m => ({
				key: m.id,
				link: `/speakers/${m.uid}`,
				title: m.name,
				thumbnail: m.thumbnail,
			}))}
		/>
	);
}
