import { client, GraphqlEdge, GraphqlResponse } from '~/types/graphql.types';
import {
	ChannelsQueryResponse,
	CHANNEL_BY_UID,
	ALL_CHANNELS,
} from './channels.gql';
import { CmsChannel } from '~/types/cms.types';
import { Channel } from './channels.types';
import { mapChannel } from './channels.mappers';

export async function getChannels(): Promise<GraphqlResponse<Array<Channel>>> {
	const response = await client.query<ChannelsQueryResponse>({
		query: ALL_CHANNELS,
	});
	return {
		...response,
		data: response.data.allChannels.edges.map(
			(edge: GraphqlEdge<CmsChannel>) => mapChannel(edge.node)
		),
	};
}

export async function getChannel(
	uid: string
): Promise<GraphqlResponse<Channel>> {
	const response = await client.query<ChannelsQueryResponse>({
		query: CHANNEL_BY_UID,
		variables: { uid },
	});
	return {
		...response,
		data: mapChannel(response.data.allChannels.edges[0].node),
	};
}
