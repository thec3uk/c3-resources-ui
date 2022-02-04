import { Box } from '@chakra-ui/react';

export function Section({ children }: { children: any }) {
	return (
		<Box
			w={'100%'}
			bg={'gray.300'}
			pl={[2, 5, 5]}
			pr={[2, 5, 5]}
			pt={8}
			pb={8}
		>
			{children}
		</Box>
	);
}
