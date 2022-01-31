import { Series } from './series.types';
import { client, GraphqlEdge, GraphqlResponse } from '~/types/graphql.types';
import { AllSeriesQueryResponse, ALL_SERIES, SERIES_BY_ID } from './series.gql';
import { mapSeries } from './series.mappers';
import { CmsSeries } from '~/types/cms.types';

export async function getAllSeries(): Promise<GraphqlResponse<Array<Series>>> {
	const response = await client.query<AllSeriesQueryResponse>({
		query: ALL_SERIES,
	});
	return {
		...response,
		data: response.data.allSeriess.edges.map(
			(edge: GraphqlEdge<CmsSeries>) => mapSeries(edge.node)
		),
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
