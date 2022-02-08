import { MetaFunction, LoaderFunction, useLoaderData } from 'remix';
import { SearchMessages, SearchQueryParams } from '~/components/SearchMessages';
import { Handle, SitemapEntry } from '~/utils/sitemap.server';
import { getAllMessages } from './messages.loaders';
import styles from '~/styles/messages.css';

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export const handle: Handle = {
	getSitemapEntries: async () => {
		const messages = await getAllMessages({});
		const entries: Array<SitemapEntry> = [
			{
				route: `/messages`,
				priority: 0.5,
			},
		];
		messages.data.map(m =>
			entries.push({
				route: `/messages/${m.uid}`,
				priority: 0.4,
			})
		);
		return entries;
	},
};

export const meta: MetaFunction = () => {
	return {
		title: 'Latest messages - The C3 Church',
		description: 'Catch up on the latest messages',
	};
};

export const loader: LoaderFunction = async ({ request }) => {
	let url = new URL(request.url);
	return {
		query: url.searchParams.get('q'),
		speakers: url.searchParams.get('speaker'),
		channel: url.searchParams.get('channel'),
		series: url.searchParams.get('series'),
	};
};

export default function Messages() {
	const queryParams = useLoaderData<SearchQueryParams>();
	return <SearchMessages queryParams={queryParams} />;
}
