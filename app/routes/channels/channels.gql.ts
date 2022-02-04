import gql from 'graphql-tag';
import { CmsChannel } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type ChannelsQueryResponse = {
	allChannels: ArrayResult<CmsChannel>;
};

const CHANNEL_FRAGMENT = gql`
	fragment channel on Channel {
		name
		description
		thumbnail
		hero
		_meta {
			id
			uid
		}
	}
`;

export const ALL_CHANNELS = gql`
	query allChannels {
		allChannels {
			edges {
				node {
					...channel
				}
			}
		}
	}
	${CHANNEL_FRAGMENT}
`;

export const CHANNEL_BY_UID = gql`
	query channel($uid: String) {
		allChannels(uid: $uid) {
			edges {
				node {
					...channel
				}
			}
		}
	}
	${CHANNEL_FRAGMENT}
`;
