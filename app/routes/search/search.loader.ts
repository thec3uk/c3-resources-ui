import algoliasearch from 'algoliasearch';
import { ApolloQueryResult } from 'apollo-client';
import { client } from '~/types/graphql.types';
import { AllSearchDataQueryResponse, SEARCH_DATA } from './search.gql';
import { mapToSearchIndexRecord } from './search.mapper';
import { SearchIndexRecord } from './search.types';

const fetchMoreResults = async (
	after: string
): Promise<ApolloQueryResult<AllSearchDataQueryResponse>> =>
	await client.query<AllSearchDataQueryResponse>({
		query: SEARCH_DATA,
		variables: { after },
	});

export async function populateIndex() {
	const algoliaClient = algoliasearch(
		'I2N55PC133',
		'6163c145b5fc667b0a34dca6099067aa'
	);
	const index = algoliaClient.initIndex('c3_resources');
	let endCursor = '';
	let hasNextPage = true;
	const algoliaData: Array<SearchIndexRecord> = [];

	while (hasNextPage) {
		try {
			const { data, loading, errors } = await fetchMoreResults(endCursor);
			data.allMessages.edges.map(results =>
				algoliaData.push(mapToSearchIndexRecord(results.node))
			);
			hasNextPage = data.allMessages.pageInfo.hasNextPage;
			endCursor = data.allMessages.pageInfo.endCursor;
		} catch {
			hasNextPage = false;
		}
	}

	return await index.saveObjects(algoliaData);
}
