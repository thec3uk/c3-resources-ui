import { SearchIcon } from '@chakra-ui/icons';
import {
	HStack,
	Heading,
	Spacer,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
} from '@chakra-ui/react';
import { Link } from 'remix';

export function SearchBar({
	link,
	title,
	placeholder,
}: {
	link: string;
	title?: string;
	placeholder?: string;
}) {
	return (
		<HStack p={4}>
			<Heading as="h1" size="lg" display={['none', 'inherit', 'inherit']}>
				{title}
			</Heading>
			<Spacer />
			<Link to={link}>
				<Button borderRadius={'lg'} fontWeight={'400'}>
					<SearchIcon mr={5} /> {placeholder || 'Search...'}
				</Button>
			</Link>
		</HStack>
	);
}
