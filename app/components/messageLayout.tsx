import { Message } from '~/routes/messages/messages.types';
import ReactPlayer from 'react-player';
import Spotify from 'react-spotify-embed';
import { Link } from 'remix';
import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { Speaker } from '~/routes/speakers/speakers.types';
import dayjs from 'dayjs';

function SpeakerLink({ speaker }: { speaker: Speaker }) {
	return <Link to={`/speakers/${speaker.id}`}>{speaker.name}</Link>;
}

export default function MessageLayout({ message }: { message: Message }) {
	return (
		<Box p={10} w={'100%'} bg={'gray.300'}>
			<Box>
				<Box
					className="player-wrapper"
					ml={[10, 10, 100]}
					mr={[10, 10, 100]}
					paddingTop={['50%', '50%', '46%']}
				>
					<ReactPlayer
						url={message.video} // improve this TS hack.
						className="react-player"
						width="100%"
						height="100%"
					/>
				</Box>
				<Box ml={[10, 10, 100]} mt={5}>
					<HStack>
						<Heading as="h2" size="md">
							{message.title}
						</Heading>
						<Text>
							{dayjs(message.date).format('DD MMMM, YYYY')}
						</Text>
					</HStack>
					<VStack align={'start'} mt={2}>
						{message.speakers?.map(speaker => (
							<SpeakerLink key={speaker.id} speaker={speaker} />
						))}
					</VStack>
				</Box>
			</Box>
			<Box mr={[10, 10, 100]} ml={[10, 10, 100]} mt={5}>
				{message?.podcast && (
					<Spotify height={'152px'} link={message.podcast} wide />
				)}
			</Box>
		</Box>
	);
}
