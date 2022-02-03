import gql from 'graphql-tag';
import { CmsMessage, CmsSeries } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';
import { Series } from './series.types';

export interface AllSeriesQueryResponse {
	allSeriess: ArrayResult<CmsSeries>;
}

export interface SeriesQueryResponse {
	series: Series;
}

const SERIES_FRAGMENT = gql`
	fragment series on Series {
		_meta {
			id
			uid
		}
		title
		description
		thumbnail
		hero
		linked_resources {
			resources {
				... on Resource {
					title
					description
					link {
						... on _ExternalLink {
							url
						}
					}
				}
			}
		}
	}
`;

// the date here should probably be a start date added to the model.
export const ALL_SERIES = gql`
	query allSeries {
		allSeriess(sortBy: meta_lastPublicationDate_DESC) {
			edges {
				node {
					...series
				}
			}
		}
	}
	${SERIES_FRAGMENT}
`;

export const SERIES_BY_ID = gql`
	query series($uid: String!) {
		series(uid: $uid, lang: "en-gb") {
			...series
		}
	}
`;

export const SERIES_MESSAGES = gql`
	query seriesMesages($id: String) {
		allMessages(where: { series: $id }) {
			edges {
				node {
					title
					thumbnail
					date
					_meta {
						id
						uid
					}
				}
			}
		}
	}
`;
