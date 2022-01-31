import { CmsImage } from '~/types/cms.types';

export type Speaker = {
	id: string;
	name: string;
	bio: string;
	hero?: string;
	thumbnail?: CmsImage;
	role?: string;
};
