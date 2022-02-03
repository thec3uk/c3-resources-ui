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
	Spacer,
} from '@chakra-ui/react';
import YouTubePlayer from 'react-player/youtube';
import { Link, LoaderFunction, useLoaderData, useNavigate } from 'remix';
import { ImageGrid } from '~/components/ImageGrid';
import { Theme } from '~/components/ImageGrid/imageGrid.types';
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

	const navigateToSearch = (e: string) => navigate(`messages?q=${e}`);
	return (
		<>
			<Box p={10} w={'100%'} bg={'gray.300'}>
				<HStack p={4}>
					<Heading as="h1" size="lg">
						Messages
					</Heading>
					<Spacer />
					<InputGroup maxW={'30%'}>
						<InputLeftElement
							pointerEvents="none"
							children={<SearchIcon />}
						/>
						<Input
							type="text"
							placeholder="Search messages..."
							bg={'white'}
							onChange={e => navigateToSearch(e.target.value)}
						/>
					</InputGroup>
				</HStack>
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
			<ImageGrid
				theme={Theme.light}
				title="Browse Channels"
				items={channels.map(channel => ({
					key: channel.uid,
					link: `/channels/${channel.uid}`,
					title: channel.name,
					thumbnail: channel.thumbnail,
				}))}
			/>
			<ImageGrid
				theme={Theme.dark}
				title="Browse Series"
				items={series.map(series => ({
					key: series.uid,
					link: `/series/${series.uid}`,
					title: series.title,
					thumbnail: series.thumbnail,
				}))}
			/>
		</>
	);
}
