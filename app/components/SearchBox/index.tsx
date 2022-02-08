import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { SearchIcon } from '@chakra-ui/icons';

export interface SearchBoxProps extends SearchBoxProvided {}

const SearchBox: React.FC<SearchBoxProps> = ({ currentRefinement, refine }) => {
	return (
		<InputGroup
			width={['100%', '60%', '40%']}
			bg={'white'}
			borderRadius={'full'}
		>
			<InputLeftElement
				pointerEvents="none"
				children={<SearchIcon color="gray.300" />}
			/>
			<Input
				autoFocus
				type="text"
				value={currentRefinement}
				placeholder="Search..."
				onChange={e => refine(e.target.value)}
			/>
		</InputGroup>
	);
};

export const C3SearchBox = connectSearchBox(SearchBox);
