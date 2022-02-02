import { Image, Spacer, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link, NavLink } from 'remix';

export default function Header() {
	return (
		<HStack as="nav" spacing={4} p={4} width={'100%'}>
			<Link to="/">
				<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
			</Link>
			<ChakraLink as={NavLink} to="/messages">
				Messages
			</ChakraLink>
			<ChakraLink as={NavLink} to="/series">
				Series
			</ChakraLink>
			<ChakraLink as={NavLink} to="/speakers">
				Speakers
			</ChakraLink>
			<Spacer />
		</HStack>
	);
}
