import { Box, Container, VStack } from '@chakra-ui/react';
import Header from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<VStack width={'100%'}>
			<Header />
			<Box w={'100%'} as="main">
				{children}
			</Box>
		</VStack>
	);
}
