import { Box, VStack, Heading, Button, Text, Flex } from '@chakra-ui/react';
import { Link } from 'remix';
import { ResponsiveVideo } from '../ResponsiveVideo';

export interface IVideoBannerProps {
	videoUrl?: string;
	title: string;
	subTitle?: string;
	description?: string;
	callToAction?: {
		link: string;
		title: string;
	};
}

export function VideoBanner({
	videoUrl,
	title,
	subTitle,
	description,
	callToAction,
}: IVideoBannerProps) {
	return (
		<>
			<Flex direction={['column', 'column', 'row']}>
				<Box width={[400, 450, 800]}>
					{/** TODO: what is the fall back **/}
					{videoUrl && <ResponsiveVideo video={videoUrl} />}
				</Box>
				<VStack spacing={5} p={10} align="start">
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
							<Button bg={'white'}>{callToAction?.title}</Button>
						</Link>
					)}
				</VStack>
			</Flex>
		</>
	);
}
