import {
	Box,
	VStack,
	Heading,
	Button,
	Text,
	Flex,
	Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'remix';
import { Theme } from '../ImageGrid/imageGrid.types';
import { ResponsiveVideo } from '../ResponsiveVideo';
import { Section } from '../Section';

export interface IVideoBannerProps {
	videoUrl?: string;
	title: string;
	subTitle?: string;
	description?: string;
	callToAction?: {
		link: string;
		title: string;
	};
	image?: string;
	theme?: Theme;
}

export function VideoBanner({
	videoUrl,
	title,
	subTitle,
	description,
	callToAction,
	image,
}: IVideoBannerProps) {
	const [autoPlay, setAutoplay] = useState<boolean>(false);
	const staticSizes = ['90%', '90%', 800];
	const dynamicSizes = ['100%', '100%', 920];
	return (
		<Section
			theme={Theme.light}
			onEnter={() => {
				setAutoplay(true);
			}}
			onLeave={() => setAutoplay(false)}
		>
			<Flex
				direction={['column', 'column', 'row']}
				justifyContent={['center', 'center', 'space-between']}
			>
				<Box
					width={autoPlay ? dynamicSizes : staticSizes}
					ml={'auto'}
					mr={'auto'}
					pb={[2, 5, 5]}
					pr={[0, 5, 5]}
				>
					{/** TODO: what is the fall back **/}
					{videoUrl && (
						<ResponsiveVideo video={videoUrl} playing={autoPlay} />
					)}
				</Box>
				<VStack
					spacing={[2, 2, 5]}
					align="start"
					w={['90%', 'inherit', 'inherit']}
					ml={'auto'}
					mr={'auto'}
				>
					<Heading as="h1" size="lg" color="red.500">
						{title}
					</Heading>
					<Heading
						as={description ? 'h4' : 'p'}
						size="md"
						fontStyle="italic"
					>
						{subTitle}
					</Heading>
					<Text>{description}</Text>
					{callToAction && (
						<Link to={callToAction?.link}>
							<Button>{callToAction?.title}</Button>
						</Link>
					)}
					{image && (
						<Image src={image} w={'128px'} borderRadius={'full'} />
					)}
				</VStack>
			</Flex>
		</Section>
	);
}
