import { useEffect, useState } from 'react';
import type { LoaderFunction, MetaFunction } from 'remix';
import { useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { GraphqlResponse } from '~/types/graphql.types';
import { getAllMessages, getMessage } from '~/routes/messages/messages.loaders';
import { Message } from '~/routes/messages/messages.types';
import { IImageBoxProps, Theme } from '~/components/ImageGrid/imageGrid.types';
import { MessageLayout } from '~/components/MessageLayout';
import { ImageGrid } from '~/components/ImageGrid';
import { SpeakerBio } from '~/components/SpeakerBio';
import { Handle } from '~/utils/sitemap.server';
import { toTitleCase } from '~/utils/misc';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getMessage(params.slug);
};

export const handle: Handle = {
	getSitemapEntries: () => null,
};

export const meta: MetaFunction = ({ params }) => {
	return {
		title: `${toTitleCase(params.slug || '')} - Messages - The C3 Church`,
		description: 'Catch up on the latest messages',
	};
};

export default function MessagePage() {
	const { data: message } = useLoaderData<GraphqlResponse<Message>>();
	const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);

	useEffect(() => {
		async function getMessages() {
			const { data } = await getAllMessages({});
			setMessages(
				data
					// TODO: a better way to filter this. Ideally in the GraphQL query
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
	return (
		<>
			<MessageLayout message={message} />
			<ImageGrid
				title="Recent Videos"
				items={messages}
				theme={Theme.light}
			/>

			{message?.speakers?.length === 1 && (
				<SpeakerBio speaker={message.speakers[0]} />
			)}
		</>
	);
}
