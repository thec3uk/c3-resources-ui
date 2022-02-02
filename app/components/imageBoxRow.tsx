import { Box, Heading, HStack, VStack, Image, LinkBox } from '@chakra-ui/react';
import { Link } from 'remix';
import { CmsImage } from '~/types/cms.types';

export interface IImageBoxProps {
	key: string;
	link: string;
	title: string;
	thumbnail?: CmsImage;
	date?: string;
}

export enum Theme {
	light,
	dark,
}

export function ImageBox({
	box,
	theme,
}: {
	box: IImageBoxProps;
	theme?: Theme;
}) {
	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			borderColor={theme === Theme.light ? 'gray.300' : 'black'}
			overflow="hidden"
			width={60}
			margin={2}
		>
			<Link to={box.link}>
				<Image src={box.thumbnail?.url} alt={box.thumbnail?.alt} />
				<Box
					p="6"
					borderTop="1px"
					borderColor={theme === Theme.light ? 'gray.300' : 'black'}
					bg={'white'}
				>
					<Box
						mt="1"
						fontWeight="semibold"
						as="h4"
						lineHeight="tight"
						isTruncated
					>
						{box.title} {box.date && <span>- {box.date}</span>}
					</Box>
				</Box>
			</Link>
		</Box>
	);
}

export function ImageBoxRow({
	title,
	boxes,
	theme,
}: {
	title: string;
	boxes: Array<IImageBoxProps>;
	theme: Theme;
}) {
	return (
		<Box p={10} w={'100%'} bg={theme === Theme.dark ? 'gray.300' : 'white'}>
			<Heading as="h4" size={'md'} mb={2}>
				{title}
			</Heading>
			<HStack justifyContent={'space-evenly'}>
				{boxes.map(box => {
					return (
						<ImageBox
							key={box.key}
							box={box}
							theme={theme}
						></ImageBox>
					);
				})}
			</HStack>
		</Box>
	);
}
