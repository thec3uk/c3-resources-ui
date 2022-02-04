import { LoaderFunction, useLoaderData } from 'remix';
import { ImageGrid } from '~/components/ImageGrid';
import { GraphqlResponse } from '~/types/graphql.types';
import { getSpeakers } from './speakers.loader';
import { Speaker } from './speakers.types';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';

export const handle: Handle = {
	getSitemapEntries: async () => {
		const speakers = await getSpeakers();
		const entries: Array<SitemapEntry> = [
			{
				route: `/speakers`,
				priority: 0.5,
			},
		];
		speakers.data.map(m =>
			entries.push({
				route: `/speakers/${m.uid}`,
				priority: 0.4,
			})
		);
		return entries;
	},
};

export const loader: LoaderFunction = async () => {
	return getSpeakers();
};

export default function Speakers() {
	const { data: speakers } = useLoaderData<GraphqlResponse<Array<Speaker>>>();
	return (
		<ImageGrid
			title="Speakers"
			items={speakers.map(m => ({
				key: m.id,
				link: `/speakers/${m.uid}`,
				title: m.name,
				thumbnail: m.thumbnail,
			}))}
		/>
	);
}
