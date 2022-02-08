import { Box, HStack, Heading, Spacer, Flex, VStack } from '@chakra-ui/react';
import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	Hits,
	Configure,
	InfiniteHits,
} from 'react-instantsearch-dom';
import { C3SearchBox } from '../SearchBox';
import { CustomRefinementList } from '../SearchFacetList';
import { SearchHit } from '../SearchHit';

export interface SearchQueryParams {
	channel?: string;
	series?: string;
	speakers?: string;
	query?: string;
}

const searchClient = algoliasearch(
	'I2N55PC133',
	'c7d06d28a18680f32bb377222c532d26'
);

export function SearchMessages({
	queryParams,
}: {
	queryParams: SearchQueryParams;
}) {
	return (
		<Box p={5}>
			<InstantSearch indexName="c3_resources" searchClient={searchClient}>
				<Configure hitsPerPage={6} />
				<HStack pb={5}>
					<Heading
						as="h1"
						size="lg"
						display={['none', 'inherit', 'inherit']}
					>
						Messages
					</Heading>
					<Spacer />
					<C3SearchBox defaultRefinement={queryParams.query} />
				</HStack>
				<Flex>
					<VStack
						alignItems={'start'}
						spacing={5}
						display={['none', 'inherit', 'inherit']}
						minW={200}
					>
						<CustomRefinementList
							attribute={'speakers'}
							title={'Speakers'}
							defaultRefinement={
								queryParams.speakers
									? [queryParams.speakers]
									: []
							}
							searchable
						/>
						<CustomRefinementList
							attribute={'channel'}
							title={'Channels'}
							defaultRefinement={
								queryParams?.channel
									? [queryParams.channel]
									: []
							}
							searchable
						/>
						<CustomRefinementList
							attribute={'series'}
							title={'Series'}
							defaultRefinement={
								queryParams?.series ? [queryParams.series] : []
							}
							searchable
						/>
					</VStack>
					<InfiniteHits hitComponent={SearchHit} />
				</Flex>
			</InstantSearch>
		</Box>
	);
}
