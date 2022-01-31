import gql from 'graphql-tag';
import { CmsMessage, CmsSeries } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllSeriesQueryResponse = {
	allSeriess: ArrayResult<CmsSeries>;
};

export const ALL_SERIES = gql`
	query allSeries {
		allSeriess {
			edges {
				node {
					_meta {
						id
					}
					title
					description
					thumbnail
					hero
					messages {
						talk {
							... on Talk {
								_meta {
									id
								}
								title
								date
								speakers {
									speaker {
										... on Speaker {
											name
										}
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
		allSeriess(id: $id) {
			edges {
				node {
					_meta {
						id
					}
					title
					description
					hero
					thumbnail
					messages {
						talk {
							... on Talk {
								_meta {
									id
								}
								title
								date
								speakers {
									speaker {
										... on Speaker {
											name
										}
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
