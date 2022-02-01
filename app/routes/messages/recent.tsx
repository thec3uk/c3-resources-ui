import { SearchIcon } from '@chakra-ui/icons';
import {
	Heading,
	Flex,
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
import { Link, LoaderFunction, useLoaderData } from 'remix';
import { ImageBoxRow, Theme } from '~/components/imageBoxRow';
import { getLatestMessage } from '~/routes/messages/messages.loaders';
import { GraphqlResponse } from '~/types/graphql.types';
import { useNavigate } from 'react-router-dom';
import { getChannels } from '../routes/channels/channels.loader';
import { Channel } from '../routes/channels/channels.types';
import { getAllSeries } from '../routes/series/series.loader';
import { Series } from '../routes/series/series.types';
import { Message } from '../routes/messages/messages.types';

export const loader: LoaderFunction = async () => {
	const latestMessageResponse = await getLatestMessage();
	const channelsResponse = await getChannels();
	const seriesResponse = await getAllSeries();
	return { latestMessageResponse, channelsResponse, seriesResponse };
};

export default function Recent() {
	const { latestMessageResponse, channelsResponse, seriesResponse } =
		useLoaderData<{
			latestMessageResponse: GraphqlResponse<Message>;
			channelsResponse: GraphqlResponse<Array<Channel>>;
			seriesResponse: GraphqlResponse<Array<Series>>;
		}>();
	const { data: message } = latestMessageResponse;
	const { data: channels } = channelsResponse;
	const { data: series } = seriesResponse;
	return (
		<Flex direction="column">
			<Flex direction="column" w={'100%'} bg={'gray.300'} p={5}>
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
			</Flex>
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
		</Flex>
	);
}
