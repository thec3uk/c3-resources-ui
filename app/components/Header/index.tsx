import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Image,
	Spacer,
	HStack,
	Link as ChakraLink,
	Grid,
	GridItem,
	Icon,
} from '@chakra-ui/react';
import { Link, NavLink } from 'remix';

export default function Header() {
	return (
		<Grid
			templateColumns="repeat(10, 1fr)"
			gap={4}
			width={'100%'}
			p={4}
			textTransform={'uppercase'}
		>
			<GridItem colSpan={2}>
				<Link to="/">
					<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
				</Link>
			</GridItem>
			<GridItem colStart={5}>
				<ChakraLink as={NavLink} to="/messages">
					Messages
				</ChakraLink>
			</GridItem>
			<GridItem colStart={6}>
				<ChakraLink as={NavLink} to="/channels">
					Channels
				</ChakraLink>
			</GridItem>
			<GridItem colStart={11}>
				<HamburgerIcon w={8} h={8} />
			</GridItem>
		</Grid>
	);
}
