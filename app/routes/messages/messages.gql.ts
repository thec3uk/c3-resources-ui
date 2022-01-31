import gql from 'graphql-tag';
import { CmsMessage } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllTalksQueryResponse = {
	allTalks: ArrayResult<CmsMessage>;
};

export const ALL_MESSAGES = gql`
	query {
		allTalks {
			totalCount
			edges {
				node {
					title
					date
					_meta {
						id
					}
					thumbnail

					series {
						... on Series {
							title
							description
							_meta {
								id
							}
						}
					}
					embed_video
					podcast
					speakers {
						speaker {
							... on Speaker {
								name
								_meta {
									id
								}
								thumbnail
								role
							}
						}
					}
				}
			}
		}
	}
`;

export const LATEST_MESSAGE = gql`
	query latestMessage {
		allTalks(sortBy: date_DESC, first: 1) {
			edges {
				node {
					title
					date
					_meta {
						id
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
							}
						}
					}
					embed_video
					podcast
					speakers {
						speaker {
							... on Speaker {
								name
								_meta {
									id
								}
								thumbnail
								role
							}
						}
					}
				}
			}
		}
	}
`;

export const MESSAGE_BY_ID = gql`
	query message($id: String) {
		allTalks(id: $id) {
			edges {
				node {
					title
					date
					_meta {
						id
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
							}
						}
					}
					embed_video
					podcast
					speakers {
						speaker {
							... on Speaker {
								name
								_meta {
									id
								}
								thumbnail
								role
							}
						}
					}
				}
			}
		}
	}
`;
