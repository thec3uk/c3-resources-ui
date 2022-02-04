import { SimpleGrid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Message } from '~/routes/messages/messages.types';
import { ImageBox } from '../ImageBox';

export function SearchGrid({ messages }: { messages: Array<Message> }) {
	return (
		<SimpleGrid minChildWidth={'150px'} width={'full'} spacing="40px">
			{messages.map(message => (
				<ImageBox
					key={message.id}
					box={{
						key: message.id,
						link: `/messages/${message.uid}`,
						title: message.title,
						subTitle: message.speakers?.length
							? message.speakers[0].name
							: dayjs(message.date).format('MMMM D, YYYY'),
						thumbnail: message.thumbnail,
					}}
				/>
			))}
		</SimpleGrid>
	);
}
