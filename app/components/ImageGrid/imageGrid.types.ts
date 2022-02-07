export interface IImageBoxProps {
	key: string;
	link: string;
	title: string;
	thumbnail?: string;
	subTitle?: string;
	trailer?: string;
}

export enum Theme {
	light,
	dark,
}
