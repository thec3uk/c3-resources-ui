import { LinksFunction, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getAllMessages, getMessage } from '~/routes/messages/messages.loaders';
import { Message } from '~/routes/messages/messages.types';
import invariant from 'tiny-invariant';
import MessageLayout from '~/components/messageLayout';
import { GraphqlResponse } from '~/types/graphql.types';
import stylesUrl from '../../styles/messages.css';
import { IImageBoxProps, ImageBoxRow, Theme } from '~/components/imageBoxRow';
import { useEffect, useState } from 'react';
import { Box, Heading, HStack, Text, Image } from '@chakra-ui/react';

export let links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getMessage(params.slug);
};

export default function MessagePage() {
	const { data: message, loading } =
		useLoaderData<GraphqlResponse<Message>>();
	const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);
	useEffect(() => {
		async function getMessages() {
			const { data } = await getAllMessages();
			setMessages(
				data
					// this is a hack because I can't see how to do uid !== {id} on gql
					?.filter(f => f.uid !== message.uid)
					.map(m => ({
						key: m.uid,
						link: `/messages/${m.uid}`,
						title: m.title,
						thumbnail: m.thumbnail,
					}))
			);
		}
		getMessages();
	}, [message]);
	console.log(message);
	return (
		<>
			<MessageLayout message={message} />
			<ImageBoxRow
				title="Recent Videos"
				boxes={messages}
				theme={Theme.light}
			/>

			{message?.speakers?.length === 1 && (
				<Box p={10} w={'100%'} bg={'gray.300'}>
					<Heading as="h2" size="lg" mb={5}>
						More about {message?.speakers[0].name}
					</Heading>
					<HStack>
						<Text>{message?.speakers[0].bio}</Text>
						<Image
							src={message.speakers[0].thumbnail?.url}
							width={
								message.speakers[0].thumbnail?.dimensions.width
							}
							height={
								message.speakers[0].thumbnail?.dimensions.height
							}
							borderRadius={'full'}
						></Image>
					</HStack>
				</Box>
			)}
		</>
	);
}
