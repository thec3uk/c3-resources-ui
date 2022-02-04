import { SearchIcon } from '@chakra-ui/icons';
import {
	HStack,
	Heading,
	Spacer,
	InputGroup,
	InputLeftElement,
	Input,
} from '@chakra-ui/react';

export function SearchBar({
	searchTerm,
	onChange,
}: {
	searchTerm: string;
	onChange: (e: string) => void;
}) {
	return (
		<HStack p={4}>
			<Heading as="h1" size="lg" display={['none', 'inherit', 'inherit']}>
				Messages
			</Heading>
			<Spacer />
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
					type="text"
					value={searchTerm}
					placeholder="Search messages..."
					onChange={e => onChange(e.target.value)}
				/>
			</InputGroup>
		</HStack>
	);
}
