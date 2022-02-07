import { Box, Image } from '@chakra-ui/react';
import { Link } from 'remix';
import { IImageBoxProps, Theme } from '../ImageGrid/imageGrid.types';

export function ImageBox({
	box,
	theme,
}: {
	box: IImageBoxProps;
	theme?: Theme;
}) {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			borderColor={theme === Theme.light ? 'gray.300' : 'gray.900'}
			overflow="hidden"
			margin={2}
			maxWidth={'256px'}
		>
			<Link to={box.link}>
				<Image src={box.thumbnail} />
				<Box
					p={4}
					borderColor={
						theme === Theme.light ? 'gray.300' : 'gray.900'
					}
					bg={'white'}
				>
					<Box
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
						color={'gray.800'}
					>
						{box.title}
					</Box>
					<Box
						as="h6"
						lineHeight="tight"
						isTruncated
						color={'gray.500'}
					>
						{box.subTitle}
					</Box>
				</Box>
			</Link>
		</Box>
	);
}
