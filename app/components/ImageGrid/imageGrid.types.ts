import { CmsImage } from '~/types/cms.types';

export interface IImageBoxProps {
	key: string;
	link: string;
	title: string;
	thumbnail?: CmsImage;
	subTitle?: string;
}

export enum Theme {
	light,
	dark,
}
