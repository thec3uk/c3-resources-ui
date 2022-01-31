import { Image } from '@chakra-ui/react';
import { Speaker } from '~/routes/speakers/speakers.types';

export default function SpeakerLayout({ speaker }: { speaker: Speaker }) {
	return (
		<div>
			<h1>{speaker.name}</h1>
			<h3>{speaker.role}</h3>
			<p>{speaker.bio}</p>
			<Image
				src={speaker.thumbnail?.url}
				alt={speaker.thumbnail?.alt}
				borderRadius="full"
				boxSize="150px"
			></Image>
		</div>
	);
}
