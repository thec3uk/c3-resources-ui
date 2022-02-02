import { client, GraphqlResponse } from '~/types/graphql.types';
import {
	AllMessagesQueryResponse,
	ALL_MESSAGES,
	LATEST_MESSAGE,
	MESSAGE_BY_ID,
	SEARCH_MESSAGES,
	SERIES_MESSAGES,
} from './messages.gql';
import { mapAllMessages, mapToMessage } from './messages.mappers';
import { Message } from './messages.types';

export async function getMessages(): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: ALL_MESSAGES,
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function searchMessages(
	term: string
): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: SEARCH_MESSAGES,
		variables: { term },
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function getSeriesMessages(
	seriesId: string
): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: SERIES_MESSAGES,
		variables: { seriesId: seriesId },
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function getSpeakerMessages(
	seriesId: string
): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: SERIES_MESSAGES,
		variables: { speaker: seriesId },
	});
	return {
		...response,
		data: mapAllMessages(response.data),
	};
}

export async function getMessage(id: string): Promise<Message | unknown> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: MESSAGE_BY_ID,
		variables: { id },
	});
	return {
		...response,
		data: mapToMessage(response.data.allMessages.edges[0].node),
	};
}

// this channel id shouldn't be hardcoded
export async function getLatestMessage(): Promise<GraphqlResponse<Message>> {
	const response = await client.query<AllMessagesQueryResponse>({
		query: LATEST_MESSAGE,
		variables: { channelId: 'YfgW0xAAACAADva7' },
	});
	return {
		...response,
		data: mapToMessage(response.data.allMessages.edges[0].node),
	};
}
