import { SearchIcon } from '@chakra-ui/icons';
import {
	Heading,
	Text,
	VStack,
	Box,
	Button,
	Input,
	HStack,
	InputGroup,
	InputLeftElement,
} from '@chakra-ui/react';
import YouTubePlayer from 'react-player/youtube';
import { Link, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { ImageBoxRow, Theme } from '~/components/imageBoxRow';
import { getLatestMessage } from '~/routes/messages/messages.loaders';
import { GraphqlResponse } from '~/types/graphql.types';
import { getChannels } from './channels/channels.loader';
import { Channel } from './channels/channels.types';
import { Message } from './messages/messages.types';
import { getAllSeries } from './series/series.loader';
import { Series } from './series/series.types';

export const loader: LoaderFunction = async () => {
	const latestMessageResponse = await getLatestMessage();
	const channelsResponse = await getChannels();
	const seriesResponse = await getAllSeries();
	return { latestMessageResponse, channelsResponse, seriesResponse };
};

export default function Index() {
	const { latestMessageResponse, channelsResponse, seriesResponse } =
		useLoaderData<{
			latestMessageResponse: GraphqlResponse<Message>;
			channelsResponse: GraphqlResponse<Array<Channel>>;
			seriesResponse: GraphqlResponse<Array<Series>>;
		}>();
	const { data: message } = latestMessageResponse;
	const { data: channels } = channelsResponse;
	const { data: series } = seriesResponse;
	let navigate = useNavigate();
	return (
		<>
			<Box p={10} w={'100%'} bg={'gray.300'}>
				<HStack>
					<Box boxShadow="0px 0px 5px 1px grey">
						<YouTubePlayer url={message.video} />
					</Box>
					<VStack spacing={5} p={10} align="start">
						<Heading as="h1" size="lg" color="red.500">
							Latest Series
						</Heading>
						{message.series && (
							<>
								<Heading as="h4" size="md" fontStyle="italic">
									{message.series?.title}
								</Heading>
								<Text>{message.series.description}</Text>
								<Link to={`/series/${message.series.uid}`}>
									<Button bg={'white'}>
										View Series Page
									</Button>
								</Link>
							</>
						)}
					</VStack>
				</HStack>
			</Box>
			<ImageBoxRow
				theme={Theme.light}
				title="Browse Channels"
				boxes={channels.map(channel => ({
					key: channel.uid,
					link: `/channels/${channel.uid}`,
					title: channel.name,
					thumbnail: channel.thumbnail,
				}))}
			/>
			<ImageBoxRow
				theme={Theme.dark}
				title="Browse Series"
				boxes={series.map(series => ({
					key: series.uid,
					link: `/series/${series.uid}`,
					title: series.title,
					thumbnail: series.thumbnail,
				}))}
			/>
		</>
	);
}
