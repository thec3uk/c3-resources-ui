import gql from 'graphql-tag';
import { CmsMessage, CmsSeries } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export interface AllSeriesQueryResponse {
	allSeriess: ArrayResult<CmsSeries>;
}

export const ALL_SERIES = gql`
	query allSeries {
		allSeriess {
			edges {
				node {
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
			}
		}
	}
`;

export const SERIES_BY_ID = gql`
	query series($id: String) {
		allSeriess(uid: $id) {
			edges {
				node {
					_meta {
						id
						uid
					}
					title
					description
					hero
					thumbnail
				}
			}
		}
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
