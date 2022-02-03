import { Heading, HStack, Image, VStack, Text } from '@chakra-ui/react';
import { Speaker } from '~/routes/speakers/speakers.types';
import { Section } from '../Section';

export default function SpeakerLayout({ speaker }: { speaker: Speaker }) {
	return (
		<Section>
			<HStack>
				<VStack align={'start'}>
					<Heading as="h1" size={'lg'}>
						{speaker.name}
					</Heading>
					<Heading as="h4" size={'md'}>
						{speaker.role}
					</Heading>
					<Text
						dangerouslySetInnerHTML={{ __html: speaker.bio }}
					></Text>
					<p>{speaker.bio}</p>
				</VStack>
				<Image
					src={speaker.thumbnail?.url}
					alt={speaker.thumbnail?.alt}
					borderRadius="full"
					boxSize="150px"
				></Image>
			</HStack>
		</Section>
	);
}
