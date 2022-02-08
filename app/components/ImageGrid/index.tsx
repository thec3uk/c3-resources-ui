import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'remix';
import { ImageBox } from '../ImageBox';
import { IImageBoxProps, Theme } from './imageGrid.types';

export function ImageGrid({
	title,
	items,
	theme = Theme.light,
	link,
}: {
	title: string;
	items: Array<IImageBoxProps>;
	theme?: Theme;
	link?: {
		label: string;
		url: string;
	};
}) {
	return (
		<Box p={10} w={'100%'} bg={theme === Theme.dark ? 'gray.300' : 'white'}>
			<Heading as="h3" size={'md'} mb={2}>
				{title}
			</Heading>
			<SimpleGrid minChildWidth={'256px'} spacing="40px">
				{items.map((box, idx) => {
					return (
						<ImageBox
							key={box.key + idx}
							box={box}
							theme={theme}
						></ImageBox>
					);
				})}
			</SimpleGrid>
			<Center pt={5}>
				{link && (
					<Link to={link.url}>
						<Button borderRadius={'lg'} fontWeight={'400'}>
							{link.label}
						</Button>
					</Link>
				)}
			</Center>
		</Box>
	);
}
