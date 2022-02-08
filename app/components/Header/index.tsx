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
			templateColumns="repeat(7, 1fr)"
			textTransform={'uppercase'}
			bg={'grey.300'}
			p={[2, 2, 4]}
			w={'100%'}
		>
			<GridItem colSpan={1}>
				<Link to="/">
					<Image src="/LogoGrey.png" alt="The C3 Church - Home" />
				</Link>
			</GridItem>
			<GridItem colStart={3} display={['none', 'inherit', 'inherit']}>
				<ChakraLink as={NavLink} to="/messages">
					Messages
				</ChakraLink>
			</GridItem>
			<GridItem colStart={5} display={['none', 'inherit', 'inherit']}>
				<ChakraLink as={NavLink} to="/series">
					Series
				</ChakraLink>
			</GridItem>
			{/* <GridItem colStart={7} display={['none', 'inherit', 'inherit']}>
				<ChakraLink as={NavLink} to="/speakers">
					Speakers
				</ChakraLink>
			</GridItem> */}
			<GridItem colStart={7} display={['inherit', 'none', 'none']}>
				<HamburgerIcon w={8} h={8} />
			</GridItem>
		</Grid>
	);
}
