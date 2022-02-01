import { Link, useLoaderData } from 'remix';
import { getMessages } from '~/routes/messages/messages.loaders';
import { GraphqlResponse } from '~/types/graphql.types';
import { Message } from './messages.types';

export const loader = () => {
	return getMessages();
};

export default function Messages() {
	const {
		data: messages,
		errors,
		loading,
	} = useLoaderData<GraphqlResponse<Array<Message>>>();
	return (
		<>
			{!loading && !errors && (
				<div>
					<h1>All Messages</h1>
					{/* {messages.map(m => {
						return (
							<LinkBox
								key={m.id}
								id={m.id}
								title={m.title}
								date={m.date}
								thumbnail={m.thumbnail}
							/>
						);
					})} */}
				</div>
			)}
		</>
	);
}
