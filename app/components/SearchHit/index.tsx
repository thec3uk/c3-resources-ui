import dayjs from 'dayjs';
import { SearchIndexRecord } from '~/routes/search/search.types';
import { SearchItem } from '../SearchItem';

export function SearchHit({ hit: message }: { hit: SearchIndexRecord }) {
	return (
		<SearchItem
			key={message.id}
			box={{
				key: message.id,
				link: `/messages/${message.objectID}`,
				title: message.title,
				subTitle: message.speakers?.length
					? message.speakers.join(', ')
					: dayjs(message.date).format('MMMM D, YYYY'),
				thumbnail: message.thumbnailUrl,
				trailer: message.trailerUrl,
			}}
		/>
	);
}
