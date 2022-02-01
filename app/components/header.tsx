import { Flex, Image, Text, Spacer } from '@chakra-ui/react';
import { Link } from '@remix-run/react';

function Logo() {
	return (
		<Link to="/">
			<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
		</Link>
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
