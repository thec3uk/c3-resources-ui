import { useEffect, useState } from 'react';
import { LoaderFunction, MetaFunction, redirect } from 'remix';
import { useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { GraphqlResponse } from '~/types/graphql.types';
import {
	getAllMessages,
	getMessage,
	getSimilarMessages,
} from '~/routes/messages/messages.loaders';
import { Message } from '~/routes/messages/messages.types';
import { Theme } from '~/components/ImageGrid/imageGrid.types';
import { MessageLayout } from '~/components/MessageLayout';
import { ImageGrid } from '~/components/ImageGrid';
import { SpeakerBio } from '~/components/SpeakerBio';
import { Handle } from '~/utils/sitemap.server';
import { toTitleCase } from '~/utils/misc';

export const loader: LoaderFunction = async ({ params, request }) => {
	invariant(params.slug, 'expected params.slug');
	let url = new URL(request.url);

	const message = await getMessage(params.slug);
	if (message.data === null) {
		return redirect('/message-not-found');
	}
	const similarMessages = await getSimilarMessages(message.data.id);

	return {
		message,
		similarMessages,
		playing: url.searchParams.get('playing'),
	};
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
	const { message, similarMessages, playing } = useLoaderData<{
		message: GraphqlResponse<Message>;
		similarMessages: GraphqlResponse<Array<Message>>;
		playing: boolean;
	}>();

	return (
		<>
			<MessageLayout message={message.data} playing={playing} />
			<ImageGrid
				title="Related Videos"
				items={similarMessages.data?.map(m => ({
					key: m.uid,
					link: `/messages/${m.uid}`,
					title: m.title,
					thumbnail: m.thumbnail.url,
				}))}
				theme={Theme.light}
				link={{
					label: 'View more',
					url: '/messages',
				}}
			/>
			{message?.data.speakers?.length === 1 && (
				<SpeakerBio speaker={message.data.speakers[0]} />
			)}
		</>
	);
}
