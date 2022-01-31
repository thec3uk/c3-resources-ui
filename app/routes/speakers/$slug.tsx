import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import invariant from 'tiny-invariant';
import SpeakerLayout from '~/components/speakerLayout';
import { Speaker } from './speakers.types';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeaker } from './speakers.loader';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getSpeaker(params.slug);
};

export default function SpeakerPage() {
	const { data: speaker } = useLoaderData<GraphqlResponse<Speaker>>();
	return <SpeakerLayout speaker={speaker} />;
}
