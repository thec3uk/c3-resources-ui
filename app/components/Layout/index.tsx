import { Box, VStack } from '@chakra-ui/react';
import Header from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<VStack w={'100%'}>
			<Header />
			<Box as="main" w={'100%'}>
				{children}
			</Box>
		</VStack>
	);
}
