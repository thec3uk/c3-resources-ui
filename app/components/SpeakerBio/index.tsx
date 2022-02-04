import { Box, Heading, HStack, Text, Image } from '@chakra-ui/react';
import { Speaker } from '~/routes/speakers/speakers.types';

export function SpeakerBio({ speaker }: { speaker: Speaker }) {
	return (
		<Box p={10} w={'100%'} bg={'gray.300'}>
			<Heading as="h2" size="lg" mb={5}>
				More about {speaker.name}
			</Heading>
			<HStack>
				<Text>{speaker.bio}</Text>
				<Image
					src={speaker.thumbnail?.url}
					width={'256px'}
					height={'256px'}
					borderRadius={'full'}
				></Image>
			</HStack>
		</Box>
	);
}
