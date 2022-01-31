import { GraphQLError } from 'graphql';
import { CmsMeta } from './cms.types';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: PrismicLink({
		uri: 'https://c3-resources.cdn.prismic.io/graphql',
	}),
	cache: new InMemoryCache(),
});

export interface GraphqlEdge<T> {
	node: T;
}

export interface GraphqlNode {
	_meta: CmsMeta;
}

export type GraphqlResponse<T> = {
	data: T;
	errors?: readonly GraphQLError[];
	loading: boolean;
};

export type ArrayResult<T> = {
	totalCount: number;
	edges: GraphqlEdge<T>[];
};
