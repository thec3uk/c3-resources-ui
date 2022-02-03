import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import { ImageBox } from '../ImageBox';
import { IImageBoxProps, Theme } from './imageGrid.types';

export function ImageGrid({
	title,
	items,
	theme = Theme.light,
}: {
	title: string;
	items: Array<IImageBoxProps>;
	theme?: Theme;
}) {
	return (
		<Box p={10} w={'100%'} bg={theme === Theme.dark ? 'gray.300' : 'white'}>
			<Heading as="h3" size={'md'} mb={2}>
				{title}
			</Heading>
			<SimpleGrid
				minChildWidth={'256px'}
				spacing="40px"
				justifyContent="space-between"
			>
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
		</Box>
	);
}
