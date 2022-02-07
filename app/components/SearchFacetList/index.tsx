import { Button, Heading } from '@chakra-ui/react';
import { connectRefinementList } from 'react-instantsearch-dom';
import { RefinementListProvided } from 'react-instantsearch-core';

export interface FacetItem {
	label: string;
	value: Array<string>;
	count: number;
	isRefined: boolean;
}

export interface IRefinementList {
	attribute: string;
	operator: string;
	showMore: boolean;
	limit: number;
	showMoreLimit: number;
	facetOrdering: boolean;
}

export interface SearchFacetListProps extends RefinementListProvided {
	title: string;
}

const SearchFacetList: React.FC<SearchFacetListProps> = ({
	items,
	refine,
	title,
}) => {
	return (
		<>
			<Heading size={'md'} as={'h2'}>
				{title}
			</Heading>
			{items.map(m => (
				<Button
					bg={m.isRefined ? 'gray.100' : 'inherit'}
					borderColor={'gray.100'}
					border={'1px solid'}
					key={m.label}
					ml={2}
					borderRadius={'20px'}
					id={m.label}
					onClick={e => {
						e.preventDefault();
						refine(m.value);
					}}
				>
					{m.label}
				</Button>
			))}
		</>
	);
};

export const CustomRefinementList = connectRefinementList(SearchFacetList);
