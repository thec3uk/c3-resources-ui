import { GraphQLError } from 'graphql';
import { CmsMeta } from './cms.types';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: PrismicLink({
		uri: 'https://thec3.cdn.prismic.io/graphql',
		accessToken:
			'MC5ZZmZ6U2hBQUFDRUFEbHZU.77-977-977-977-9fu-_ve-_vUzvv73vv70d77-977-977-9Smbvv73vv73vv71DayLvv71bVO-_vVzvv70c77-977-9IQ',
	}),
	cache: new InMemoryCache(),
});

export interface GraphqlEdge<T> {
	node: T;
}

export interface GraphqlNode {
	_meta: CmsMeta;
}

export interface GraphqlResponse<T> {
	data: T;
	errors?: readonly GraphQLError[];
	loading: boolean;
}

export interface ArrayResult<T> {
	edges: GraphqlEdge<T>[];
}

export interface PagedArrayResult<T> extends ArrayResult<T> {
	pageInfo: {
		hasNextPage: boolean;
		endCursor: string;
	};
}
