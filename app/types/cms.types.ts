import { GraphqlNode } from './graphql.types';

export interface CmsText {
	type: string;
	text: string;
	spans: Array<string>;
}

export interface CmsSeries extends GraphqlNode {
	title: CmsText[];
	description: CmsText[];
	hero?: CmsImage;
	thumbnail?: CmsImage;
}

export interface CmsChannel extends GraphqlNode {
	name: CmsText[];
	description: CmsText[];
	hero?: CmsImage;
	thumbnail?: CmsImage;
}

export interface CmsMeta {
	id: string;
	uid: string;
}

export enum CmsEmbedType {
	video,
	rich,
}
export interface CmsEmbedContent {
	height: number;
	width: number;
	embed_url: string;
	type: CmsEmbedType;
	version: string;
	title: string;
	author_name: string;
	author_url: string;
	provider_name: string;
	provider_url: string;
	cache_age: string;
	thumbnail_url: string;
	thumbnail_width: number;
	thumbnail_height: number;
	html: string;
}

export interface CmsSpeaker extends GraphqlNode {
	name: CmsText[];
	role: CmsText[];
	bio?: CmsText[];
	thumbnail?: CmsImage;
	hero?: CmsImage;
}

export interface CmsMessage extends GraphqlNode {
	title: CmsText[];
	description: CmsText[];
	date: string;
	thumbnail: CmsImage;
	series: CmsSeries;
	video: CmsEmbedContent;
	podcast?: CmsEmbedContent;
	speakers: Array<{ speaker: CmsSpeaker }>;
}

export type CmsImage = {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string;
	copyright: string;
	url: string;
};

export function getText(cmsText?: CmsText[]): string {
	if (cmsText) {
		return cmsText[0].text;
	}
	return '';
}

export function getUid(node?: GraphqlNode): string {
	if (node) {
		return node._meta.uid;
	}
	return '';
}

export function getId(node?: GraphqlNode): string {
	if (node) {
		return node._meta.id;
	}
	return '';
}
