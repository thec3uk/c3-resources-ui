import { CmsImage } from '~/types/cms.types';

export type Speaker = {
	id: string;
	uid: string;
	name: string;
	bio: string;
	hero?: CmsImage;
	thumbnail?: CmsImage;
	role?: string;
};
