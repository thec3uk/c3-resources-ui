import { CmsImage } from '~/types/cms.types';
import { Series } from '../series/series.types';
import { Speaker } from '../speakers/speakers.types';

export type Download = {
	label: string;
	link: string;
};
export type Message = {
	id: string;
	title: string;
	description?: string;
	thumbnail: CmsImage;
	date: string;
	speakers?: Array<Speaker>;
	video?: string;
	podcast?: string;
	series?: Series;
};
