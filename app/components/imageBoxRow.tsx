import { Box, Heading, HStack, VStack, Image, LinkBox } from '@chakra-ui/react';
import { Link } from 'remix';
import { CmsImage } from '~/types/cms.types';

export interface IImageBoxProps {
	key: string;
	link: string;
	title: string;
	thumbnail?: CmsImage;
	subTitle?: string;
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
			borderColor={theme === Theme.light ? 'gray.300' : 'gray.900'}
			overflow="hidden"
			width={60}
			margin={2}
		>
			<Link to={box.link}>
				<Image src={box.thumbnail?.url} alt={box.thumbnail?.alt} />
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
			<Heading as="h3" size={'lg'} mb={2}>
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
