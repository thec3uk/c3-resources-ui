import { Heading } from '@chakra-ui/react';
import YouTubePlayer from 'react-player/youtube';
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { getLatestMessage } from '~/routes/messages/messages.loaders';
import { GraphqlResponse } from '~/types/graphql.types';
import { Message } from './messages/messages.types';

export const loader: LoaderFunction = async () => {
	return getLatestMessage();
};

export default function Index() {
	const { data: latestMessage } = useLoaderData<GraphqlResponse<Message>>();
	return (
		<>
			<YouTubePlayer url={latestMessage.video} />
			<Heading as="h1" size="lg" color="red.500">
				Latest Series
			</Heading>
			<Link to={`/series/${latestMessage.series.id}`}>
				<Heading as="h4" size="md" fontStyle="italic">
					{latestMessage.series?.title}
				</Heading>
			</Link>
		</>
	);
}
