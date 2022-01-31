import { Box, Text, Flex, Heading, Image } from '@chakra-ui/react';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllSeries } from './series.loader';
import { Series } from './series.types';

export const loader: LoaderFunction = async () => {
	return getAllSeries();
};

export default function AllSeries() {
	const {
		data: allSeries,
		loading,
		errors,
	} = useLoaderData<GraphqlResponse<Array<Series>>>();
	return (
		<div>
			{!loading && !errors && (
				<div>
					{allSeries.map(series => {
						return (
							<Box padding="3">
								<Link to={`/series/${series.id}`}>
									<Heading as="h4" size="md">
										{series.title}
									</Heading>
								</Link>
								<Flex>
									<Text>{series.description}</Text>
									<Image
										src={series.thumbnail?.url}
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
