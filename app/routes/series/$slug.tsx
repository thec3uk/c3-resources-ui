import { Box, Text, Flex, Heading, Image } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSeries } from './series.loader';
import { Series } from './series.types';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getSeries(params.slug);
};

export default function SeriesPage() {
	const { data: series } = useLoaderData<GraphqlResponse<Series>>();
	return (
		<>
			<Box padding="3">
				<Heading as="h4" size="md">
					{series.title}
				</Heading>
				<Flex>
					<Text>{series.description}</Text>
					<Image src={series.thumbnail?.url} boxSize="150px"></Image>
				</Flex>
			</Box>
		</>
	);
}
