import { Box, VStack } from '@chakra-ui/react';
import { Footer } from '../Footer';
import Header from '../Header';

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<VStack width={'100%'}>
			<Header />
			<Box w={'100%'} as="main">
				{children}
			</Box>
			<Footer />
		</VStack>
	);
}
