import gql from 'graphql-tag';
import { CmsMessage, CmsSpeaker } from '~/types/cms.types';
import { PagedArrayResult } from '~/types/graphql.types';
import { SPEAKER_FRAGMENT } from '../speakers/speakers.gql';

export interface AllSearchDataQueryResponse {
	allMessages: PagedArrayResult<CmsMessage>;
	allSpeakers: PagedArrayResult<CmsSpeaker>;
}

export const SEARCH_DATA = gql`
	query searchData($after: String) {
		allMessages(first: 1, after: $after) {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					_meta {
						id
						uid
					}
					title
					description
					date
					thumbnail
					trailer
					speakers {
						speaker {
							... on Speaker {
								...speaker
							}
						}
					}
				}
			}
		}
		allSpeakers {
			pageInfo {
				hasNextPage
				endCursor
			}
			edges {
				node {
					name
					role
					bio
				}
			}
		}
	}
	${SPEAKER_FRAGMENT}
`;
