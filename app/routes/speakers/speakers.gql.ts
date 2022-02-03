import gql from 'graphql-tag';
import { CmsSpeaker } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllSpeakersQueryResponse = {
	allSpeakers: ArrayResult<CmsSpeaker>;
};

const SPEAKER_FRAGMENT = gql`
	fragment speaker on Speaker {
		_meta {
			id
			uid
		}
		name
		role
		bio
		hero
		thumbnail
	}
`;

export const ALL_SPEAKERS = gql`
	query allSpeakers {
		allSpeakers {
			edges {
				node {
					...speaker
				}
			}
		}
	}
	${SPEAKER_FRAGMENT}
`;

export const SPEAKER_BY_ID = gql`
	query speakerById($uid: String) {
		allSpeakers(uid: $uid) {
			edges {
				node {
					...speaker
				}
			}
		}
	}
	${SPEAKER_FRAGMENT}
`;
