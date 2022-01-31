import { CmsSpeaker } from '~/types/cms.types';
import { client, GraphqlEdge, GraphqlResponse } from '~/types/graphql.types';
import {
	AllSpeakersQueryResponse,
	ALL_SPEAKERS,
	SPEAKER_BY_ID,
} from './speakers.gql';
import { mapSpeaker } from './speakers.mappers';
import { Speaker } from './speakers.types';

export async function getSpeakers(): Promise<GraphqlResponse<Array<Speaker>>> {
	const response = await client.query<AllSpeakersQueryResponse>({
		query: ALL_SPEAKERS,
	});
	return {
		...response,
		data: response.data.allSpeakers.edges.map(
			(edge: GraphqlEdge<CmsSpeaker>) => mapSpeaker(edge.node)
		),
	};
}

export async function getSpeaker(id: string): Promise<Speaker | unknown> {
	const response = await client.query<AllSpeakersQueryResponse>({
		query: SPEAKER_BY_ID,
		variables: { id },
	});
	return {
		...response,
		data: mapSpeaker(response.data.allSpeakers.edges[0].node),
	};
}
