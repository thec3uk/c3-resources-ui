import { SimpleGrid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Message } from '~/routes/messages/messages.types';
import { SearchItem } from '../SearchItem';

export function SearchGrid({ messages }: { messages: Array<Message> }) {
	return (
		<SimpleGrid columns={[1, 2, 2]} spacing={20} p={5}>
			{messages.map(message => (
				<SearchItem
					key={message.id}
					box={{
						key: message.id,
						link: `/messages/${message.uid}`,
						title: message.title,
						subTitle: message.speakers?.length
							? message.speakers[0].name
							: dayjs(message.date).format('MMMM D, YYYY'),
						thumbnail: message.thumbnail,
						trailer: message.trailer,
					}}
				/>
			))}
		</SimpleGrid>
	);
}
