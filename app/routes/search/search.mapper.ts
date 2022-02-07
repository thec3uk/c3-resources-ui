import { CmsMessage, getId, getText, getUid } from '~/types/cms.types';
import { mapSpeakers } from '../speakers/speakers.mappers';
import { SearchIndexRecord } from './search.types';

export function mapToSearchIndexRecord(node: CmsMessage): SearchIndexRecord {
	return {
		date: node.date,
		description: getText(node.description),
		title: getText(node.title),
		id: getId(node),
		objectID: getUid(node),
		speakers: node.speakers?.map(
			link => link?.speaker && getText(link.speaker.name)
		),
		thumbnailUrl: node.thumbnail?.url,
		trailerUrl: node.trailer?.embed_url,
		channel: getText(node.channel?.name),
		series: getText(node.series?.title),
	};
}
