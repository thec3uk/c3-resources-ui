import { Box, HStack, Text, Image } from '@chakra-ui/react';
import YouTubePlayer from 'react-player/youtube';
import { Channel } from '~/routes/channels/channels.types';

export function FeaturedChannel({
	channel,
	video,
}: {
	channel: Channel;
	video: string | undefined;
}) {
	return (
		<Box p={10} w={'100%'} bg={'gray.300'}>
			<HStack>
				<Box boxShadow="0px 0px 5px 1px grey">
					<YouTubePlayer url={video} />
				</Box>
				<Text p={4}>{channel.description}</Text>
				<Image
					src={channel.thumbnail?.url}
					w={'128px'}
					borderRadius={'full'}
				/>
			</HStack>
		</Box>
	);
}
