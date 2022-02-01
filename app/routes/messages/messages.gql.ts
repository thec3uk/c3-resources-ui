import gql from 'graphql-tag';
import { CmsMessage } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllMessagesQueryResponse = {
	allMessages: ArrayResult<CmsMessage>;
};

export const ALL_MESSAGES = gql`
	query {
		allMessages {
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
					video
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
	query latestMessage($channelId: String) {
		allMessages(
			sortBy: date_DESC
			first: 1
			where: { channel: $channelId }
		) {
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
					video
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
		allMessages(id: $id) {
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
					video
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
