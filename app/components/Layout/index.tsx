import { Box, VStack } from '@chakra-ui/react';
import Header from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<VStack>
			<Header />
			<Box as="main">{children}</Box>
		</VStack>
	);
}
