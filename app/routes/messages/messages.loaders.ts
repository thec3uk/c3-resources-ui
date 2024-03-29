import { client, GraphqlResponse } from '~/types/graphql.types';
import {
	AllMessagesQueryResponse,
	ALL_MESSAGES,
	LATEST_MESSAGE,
	MessageQueryResponse,
	MESSAGE_BY_ID,
	SIMILAR_MESSAGES,
} from './messages.gql';
import { mapAllMessages, mapToMessage } from './messages.mappers';
import { Message } from './messages.types';

export async function getAllMessages({
	seriesId,
	channelId,
	speakerId,
	limit,
}: {
	seriesId?: string;
	channelId?: string;
	speakerId?: string;
	limit?: number;
}): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: ALL_MESSAGES,
		variables: {
			seriesId: seriesId,
			channelId: channelId,
			speaker: { speaker: speakerId },
			limit,
		},
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function getMessage(
	uid: string
): Promise<GraphqlResponse<Message>> {
	const response = await client.query<MessageQueryResponse>({
		query: MESSAGE_BY_ID,
		variables: { uid },
	});
	const data =
		response.data.message != null
			? mapToMessage(response.data.message)
			: response.data.message;
	return {
		...response,
		data,
	};
}

export async function getSimilarMessages(
	id: string
): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: SIMILAR_MESSAGES,
		variables: {
			similar: {
				documentId: id,
				max: 50,
			},
		},
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

// this channel id shouldn't be hardcoded
export async function getLatestMessage(
	channelId: string = 'YfgW0xAAACAADva7'
): Promise<GraphqlResponse<Message>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: LATEST_MESSAGE,
		variables: { channelId },
	});
	return {
		...response,
		data: mapToMessage(response.data.allMessages.edges[0]?.node),
	};
}
