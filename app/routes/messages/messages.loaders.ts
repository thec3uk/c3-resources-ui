import { client, GraphqlResponse } from '~/types/graphql.types';
import {
	AllMessagesQueryResponse,
	ALL_MESSAGES,
	LATEST_MESSAGE,
	MessageQueryResponse,
	MESSAGE_BY_ID,
} from './messages.gql';
import { mapAllMessages, mapToMessage } from './messages.mappers';
import { Message } from './messages.types';

export async function getAllMessages({
	seriesId,
	channelId,
}: {
	seriesId?: string;
	channelId?: string;
}): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: ALL_MESSAGES,
		variables: { seriesId: seriesId, channelId: channelId },
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function getMessage(uid: string): Promise<Message | unknown> {
	const response = await client.query<MessageQueryResponse>({
		query: MESSAGE_BY_ID,
		variables: { uid },
	});
	return {
		...response,
		data: mapToMessage(response.data.message),
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
