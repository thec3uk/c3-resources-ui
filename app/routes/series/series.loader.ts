import { Series } from './series.types';
import { client, GraphqlEdge, GraphqlResponse } from '~/types/graphql.types';
import { AllSeriesQueryResponse, ALL_SERIES, SERIES_BY_ID } from './series.gql';
import { mapSeries } from './series.mappers';
import { CmsSeries } from '~/types/cms.types';
import { GraphQLError } from 'graphql';

const fetchMoreResults = async (after: string) =>
	await client.query<AllSeriesQueryResponse>({
		query: ALL_SERIES,
		variables: { after },
	});

export async function getAllSeries(): Promise<GraphqlResponse<Array<Series>>> {
	let endCursor = '';
	let hasNextPage = true;
	const series: Array<Series> = [];
	let loading: boolean = true;
	let errors: readonly GraphQLError[] | undefined;

	while (hasNextPage) {
		try {
			const {
				data,
				loading: l,
				errors: e,
			} = await fetchMoreResults(endCursor);
			data.allSeriess.edges.map((edge: GraphqlEdge<CmsSeries>) =>
				series.push(mapSeries(edge.node))
			);

			hasNextPage = data.allSeriess.pageInfo.hasNextPage;
			endCursor = data.allSeriess.pageInfo.endCursor;
			loading = l;
			errors = e;
		} catch (e) {
			console.log('error', e);
			hasNextPage = false;
		}
	}
	return {
		loading,
		errors,
		data: series,
	};
}

export async function getSeries(id: string): Promise<GraphqlResponse<Series>> {
	const response = await client.query<AllSeriesQueryResponse>({
		query: SERIES_BY_ID,
		variables: { id },
	});
	return {
		...response,
		data: mapSeries(response.data.allSeriess.edges[0].node),
	};
}
