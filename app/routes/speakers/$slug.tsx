import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import SpeakerLayout from '~/components/SpeakerLayout/speakerLayout';
import { Speaker } from './speakers.types';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeaker } from './speakers.loader';
import { ImageGrid } from '~/components/ImageGrid';
import { getAllMessages } from '../messages/messages.loaders';
import { useEffect, useState } from 'react';
import { IImageBoxProps } from '~/components/ImageGrid/imageGrid.types';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getSpeaker(params.slug);
};

export default function SpeakerPage() {
	const { data: speaker } = useLoaderData<GraphqlResponse<Speaker>>();
	const [messages, setMessages] = useState<Array<IImageBoxProps>>([]);

	useEffect(() => {
		async function getMessage() {
			const { data } = await getAllMessages({
				speakerId: speaker.id,
			});
			setMessages(
				data.map(m => ({
					key: m.uid,
					link: `/messages/${m.uid}`,
					title: m.title,
					thumbnail: m.thumbnail,
				}))
			);
		}
		getMessage();
	}, [speaker]);
	return (
		<>
			<SpeakerLayout speaker={speaker} />
			<ImageGrid
				items={messages}
				title={`Latest Messages from ${speaker.name}`}
			/>
		</>
	);
}
