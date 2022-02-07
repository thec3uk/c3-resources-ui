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
		speakers: mapSpeakers(node.speakers)?.map(m => m.name),
		thumbnailUrl: node.thumbnail?.url,
		trailerUrl: node.trailer?.embed_url,
	};
}
