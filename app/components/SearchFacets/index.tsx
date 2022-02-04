import { SearchIcon } from '@chakra-ui/icons';
import {
	Button,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	VStack,
} from '@chakra-ui/react';
import { Speaker } from '~/routes/speakers/speakers.types';

export function SearchFacets({ speakers }: { speakers?: Array<Speaker> }) {
	return (
		<VStack
			alignItems={'start'}
			spacing={4}
			display={['none', 'inherit', 'inherit']}
		>
			<Heading as="h2" size={'sm'}>
				Speakers
			</Heading>
			<InputGroup>
				<InputLeftElement children={<SearchIcon color="gray.300" />} />
				<Input type="input" placeholder="Search speakers..." />
			</InputGroup>
			{speakers?.map(s => (
				<Button
					key={s.id}
					ml={2}
					borderRadius={'20px'}
					id={s.id}
					onClick={() => {}}
				>
					{s.name}
				</Button>
			))}
		</VStack>
	);
}
