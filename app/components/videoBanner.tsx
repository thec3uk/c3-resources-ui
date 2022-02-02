import { Box, HStack, VStack, Heading, Button, Text } from '@chakra-ui/react';
import YouTubePlayer from 'react-player/youtube';
import { Link } from 'react-router-dom';

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
		<Box p={10} w={'100%'} bg={'gray.300'}>
			<HStack>
				<Box boxShadow="0px 0px 5px 1px grey">
					<YouTubePlayer url={videoUrl} />
				</Box>
				<VStack spacing={5} p={10} align="start">
					<Heading as="h1" size="lg" color="red.500">
						{title}
					</Heading>
					{subTitle && (
						<>
							<Heading as="h4" size="md" fontStyle="italic">
								{subTitle}
							</Heading>
							<Text>{description}</Text>
							{callToAction && (
								<Link to={callToAction.link}>
									<Button bg={'white'}>
										{callToAction.title}
									</Button>
								</Link>
							)}
						</>
					)}
				</VStack>
			</HStack>
		</Box>
	);
}
