import { GraphqlNode } from './graphql.types';

// C3 CMS content types

export interface CmsChannel extends GraphqlNode {
	name: CmsText[];
	description: CmsText[];
	hero?: CmsImage;
	thumbnail?: CmsImage;
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

export interface CmsResource extends GraphqlNode {
	title: string;
	description: string;
	date: string;
	link: CmsExternalLink;
}

export interface CmsSeries extends GraphqlNode {
	title: CmsText[];
	description: CmsText[];
	hero?: CmsImage;
	thumbnail?: CmsImage;
	linked_resources?: Array<{ resources: CmsResource }>;
}

export interface CmsSpeaker extends GraphqlNode {
	name: CmsText[];
	role: CmsText[];
	bio?: CmsText[];
	thumbnail?: CmsImage;
	hero?: CmsImage;
}

// Prismic Types

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

export enum CmsEmbedType {
	video,
	rich,
}

export type CmsExternalLink = {
	url: string;
	target: string;
};

export type CmsImage = {
	dimensions: {
		width: number;
		height: number;
	};
	alt: string;
	copyright: string;
	url: string;
};

export interface CmsMeta {
	id: string;
	uid: string;
}

export interface CmsText {
	type: string;
	text: string;
	spans: Array<string>;
}

// Helper Functions

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
