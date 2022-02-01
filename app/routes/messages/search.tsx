import { Heading } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData, Link } from 'remix';
import { ImageBox } from '~/components/imageBoxRow';
import { GraphqlResponse } from '~/types/graphql.types';
import { searchMessages } from './messages.loaders';
import { Message } from './messages.types';

export const loader: LoaderFunction = async ({ request }) => {
	let term = new URL(request.url).searchParams.get('q');
	return searchMessages(term || '');
};

export default function Search() {
	const { data: messages } = useLoaderData<GraphqlResponse<Array<Message>>>();
	return (
		<>
			<Heading>Messages</Heading>
			{messages.length ? (
				messages.map(m => (
					<ImageBox
						key={m.id}
						box={{
							key: m.uid,
							link: `/message/${m.uid}`,
							title: m.title,
							thumbnail: m.thumbnail,
						}}
					></ImageBox>
				))
			) : (
				<p>No messages</p>
			)}
			<Link to="/messages/">View All</Link>
		</>
	);
}
