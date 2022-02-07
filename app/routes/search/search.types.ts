export interface SearchIndexRecord {
	id: string;
	objectID: string;
	title: string;
	description: string;
	date: string;
	thumbnailUrl: string;
	speakers?: Array<string>;
	trailerUrl: string;
	channel?: string;
	series?: string;
}
