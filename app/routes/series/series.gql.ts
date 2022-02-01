import gql from 'graphql-tag';
import { CmsSeries } from '~/types/cms.types';
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
						uid
					}
					title
					description
					thumbnail
					hero
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
	}
`;
