import {
	CmsMessage,
	CmsSeries,
	getUid,
	getText,
	getId,
} from '~/types/cms.types';
import { Series } from './series.types';

export function mapSeries(series: CmsSeries): Series {
	return {
		id: getId(series),
		uid: getUid(series),
		title: getText(series.title),
		description: getText(series.description),
		hero: series.hero,
		thumbnail: series.thumbnail,
	};
}
