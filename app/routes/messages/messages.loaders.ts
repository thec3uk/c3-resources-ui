import { client, GraphqlResponse } from '~/types/graphql.types';
import {
	AllTalksQueryResponse,
	ALL_MESSAGES,
	LATEST_MESSAGE,
	MESSAGE_BY_ID,
} from './messages.gql';
import { mapAllTalksToMessages, mapTalkToMessage } from './messages.mappers';
import { Message } from './messages.types';

export async function getMessages(): Promise<GraphqlResponse<Array<Message>>> {
	const response = await client.query<AllTalksQueryResponse>({
		query: ALL_MESSAGES,
	});
	return {
		...response,
		data: mapAllTalksToMessages(response.data),
	};
}

export async function getMessage(id: string): Promise<Message | unknown> {
	const response = await client.query<AllTalksQueryResponse>({
		query: MESSAGE_BY_ID,
		variables: { id },
	});
	return {
		...response,
		data: mapTalkToMessage(response.data.allTalks.edges[0].node),
	};
}

export async function getLatestMessage(): Promise<GraphqlResponse<Message>> {
	const response = await client.query<AllTalksQueryResponse>({
		query: LATEST_MESSAGE,
	});
	return {
		...response,
		data: mapTalkToMessage(response.data.allTalks.edges[0].node),
	};
}
