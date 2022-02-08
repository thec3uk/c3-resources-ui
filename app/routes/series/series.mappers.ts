import {
	CmsSeries,
	getUid,
	getText,
	getId,
	CmsResource,
} from '~/types/cms.types';
import { Resource, Series } from './series.types';

export function mapSeries(series: CmsSeries): Series {
	const resources = mapResources(series.linked_resources);
	return {
		id: getId(series),
		uid: getUid(series),
		title: getText(series.title),
		description: getText(series.description),
		hero: series.hero,
		thumbnail: series.thumbnail,
		resources,
	};
}

export function mapResources(
	cmsResources?: Array<{ resources: CmsResource }>
): Array<Resource> | undefined {
	return cmsResources
		?.filter(f => f.resources !== null)
		.map((link: { resources: CmsResource }) => ({
			title: link.resources.title,
			description: link.resources.description,
			url: link.resources.link.url,
		}));
}
