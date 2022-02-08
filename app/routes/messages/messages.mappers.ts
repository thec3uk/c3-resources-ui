import { CmsMessage, getUid, getText, getId } from '~/types/cms.types';
import { GraphqlEdge } from '~/types/graphql.types';
import { mapSeries } from '../series/series.mappers';
import { mapSpeakers } from '../speakers/speakers.mappers';
import { AllMessagesQueryResponse } from './messages.gql';
import { Message } from './messages.types';

export function mapAllMessages(data: AllMessagesQueryResponse): Array<Message> {
	const messages: Array<Message> = data.allMessages.edges.map(
		(e: GraphqlEdge<CmsMessage>) => {
			return mapToMessage(e.node);
		}
	);
	return messages;
}

export function mapToMessage(message: CmsMessage): Message {
	const speakers = mapSpeakers(message.speakers);
	return {
		id: getId(message),
		uid: getUid(message),
		title: getText(message.title),
		description: getText(message.description),
		thumbnail: message.thumbnail,
		date: message.date,
		video: message.video.embed_url,
		trailer: message.trailer?.embed_url,
		shortForm: message.short_form_video?.embed_url,
		podcast: message.podcast,
		speakers,
		series: message.series ? mapSeries(message.series) : undefined,
	};
}
