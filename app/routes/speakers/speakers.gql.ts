import gql from 'graphql-tag';
import { CmsSpeaker } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllSpeakersQueryResponse = {
	allSpeakers: ArrayResult<CmsSpeaker>;
};

export const ALL_SPEAKERS = gql`
	query allSpeakers {
		allSpeakers {
			edges {
				node {
					_meta {
						id
					}
					name
					role
					bio
					hero
					thumbnail
				}
			}
		}
	}
`;

export const SPEAKER_BY_ID = gql`
	query speakerById($id: String) {
		allSpeakers(id: $id) {
			edges {
				node {
					_meta {
						id
					}
					name
					role
					bio
					hero
					thumbnail
				}
			}
		}
	}
`;
