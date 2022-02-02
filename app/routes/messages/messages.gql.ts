import gql from 'graphql-tag';
import { CmsMessage } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllMessagesQueryResponse = {
	allMessages: ArrayResult<CmsMessage>;
};

export const SEARCH_MESSAGES = gql`
	query searchMessages($term: String) {
		allMessages(where: { title_fulltext: $term }) {
			totalCount
			edges {
				node {
					title
					date
					_meta {
						id
						uid
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
								uid
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
									uid
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
						uid
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
								uid
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
									uid
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

export const SERIES_MESSAGES = gql`
	query latestMessage($seriesId: String) {
		allMessages(where: { series: $seriesId }) {
			edges {
				node {
					title
					date
					_meta {
						id
						uid
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
								uid
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
									uid
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
						uid
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
								uid
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
									uid
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
						uid
					}
					thumbnail
					series {
						... on Series {
							title
							description
							_meta {
								id
								uid
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
									uid
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
