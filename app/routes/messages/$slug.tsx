import { useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { getMessage } from '~/routes/messages/messages.loaders';
import { Message } from '~/routes/messages/messages.types';
import invariant from 'tiny-invariant';
import MessageLayout from '~/components/messageLayout';
import { GraphqlResponse } from '~/types/graphql.types';

export const loader: LoaderFunction = async ({ params }) => {
	invariant(params.slug, 'expected params.slug');
	return getMessage(params.slug);
};

export default function MessagePage() {
	const { data: message } = useLoaderData<GraphqlResponse<Message>>();
	return <MessageLayout message={message} />;
}
