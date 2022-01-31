import { CmsMessage, CmsSpeaker, getId, getText } from '~/types/cms.types';
import { GraphqlEdge } from '~/types/graphql.types';
import { mapSeries } from '../series/series.mappers';
import { mapSpeaker } from '../speakers/speakers.mappers';
import { AllTalksQueryResponse } from './messages.gql';
import { Message } from './messages.types';

export function mapAllTalksToMessages(
	data: AllTalksQueryResponse
): Array<Message> {
	const messages: Array<Message> = data.allTalks.edges.map(
		(e: GraphqlEdge<CmsMessage>) => {
			return mapTalkToMessage(e.node);
		}
	);
	return messages;
}

export function mapTalkToMessage(message: CmsMessage): Message {
	return {
		id: getId(message),
		title: getText(message.title),
		description: getText(message.description),
		thumbnail: message.thumbnail,
		date: message.date,
		video: message.embed_video.embed_url,
		podcast: message.podcast?.embed_url,
		speakers: message.speakers?.map((link: { speaker: CmsSpeaker }) =>
			mapSpeaker(link.speaker)
		),
		series: mapSeries(message.series),
	};
}
