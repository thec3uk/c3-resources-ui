import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	Text,
	Spacer,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';

function Logo() {
	return (
		<Box boxSize="sm">
			<Link to="/">
				<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
			</Link>
		</Box>
	);
}

export default function Header() {
	return (
		<Flex p={5} width="100%" height={120}>
			<Logo />
			<Spacer />
			<Text>
				<Link to="/messages">Messages</Link>
			</Text>
			<Spacer />
			<Text>
				<Link to="/series">Series</Link>
			</Text>
			<Spacer />
			<Text>
				<Link to="/speakers">Speakers</Link>
			</Text>
		</Flex>
	);
}
