import { Box } from '@chakra-ui/react';

export function Section({ children }: { children: any }) {
	return (
		<Box p={10} w={'100%'} bg={'gray.300'}>
			{children}
		</Box>
	);
}
