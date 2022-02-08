import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Message } from '../../routes/messages/messages.types';
import { SpeakerLink } from '../SpeakerLink';
import { Section } from '../Section';
import { ResponsiveVideo } from '../ResponsiveVideo';

export function MessageLayout({
	message,
	playing,
}: {
	message: Message;
	playing: boolean;
}) {
	return (
		<Section>
			<Box width={[400, 450, 800]} ml={'auto'} mr={'auto'}>
				{message.video && (
					<ResponsiveVideo video={message.video} playing />
				)}
				<HStack mt={2}>
					<Heading as="h2" size="md">
						{message.title}
					</Heading>
					<Text>{dayjs(message.date).format('DD MMMM, YYYY')}</Text>
				</HStack>
				<VStack align={'start'} mt={2} mb={2}>
					{message.speakers?.map(speaker => (
						<SpeakerLink key={speaker.id} speaker={speaker} />
					))}
				</VStack>
				{message?.podcast && (
					<div
						dangerouslySetInnerHTML={{ __html: message.podcast }}
					></div>
				)}
			</Box>
		</Section>
	);
}
