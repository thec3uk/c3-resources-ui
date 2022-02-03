import gql from 'graphql-tag';
import { CmsMessage } from '~/types/cms.types';
import { ArrayResult } from '~/types/graphql.types';

export type AllMessagesQueryResponse = {
	allMessages: ArrayResult<CmsMessage>;
};

export type MessageQueryResponse = {
	message: CmsMessage;
};

const MESSAGE_FRAGMENT = gql`
	fragment message on Message {
		title
		description
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
					bio
				}
			}
		}
	}
`;

export const ALL_MESSAGES = gql`
	query allMessages(
		$channelId: String
		$seriesId: String
		$speaker: WhereMessageSpeakers
	) {
		allMessages(
			where: {
				channel: $channelId
				series: $seriesId
				speakers: $speaker
			}
		) {
			totalCount
			edges {
				node {
					...message
				}
			}
		}
	}
	${MESSAGE_FRAGMENT}
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
					...message
				}
			}
		}
	}
	${MESSAGE_FRAGMENT}
`;

export const MESSAGE_BY_ID = gql`
	query message($uid: String!) {
		message(uid: $uid, lang: "en-gb") {
			...message
		}
	}
	${MESSAGE_FRAGMENT}
`;
