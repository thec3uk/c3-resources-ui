import { CmsImage } from '~/types/cms.types';
import { Message } from '../messages/messages.types';

export type Series = {
	id: string;
	uid: string;
	title: string;
	description: string;
	hero?: CmsImage;
	thumbnail?: CmsImage;
	messages?: Array<Message>;
};
