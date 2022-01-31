import { Message } from '~/routes/messages/messages.types';
import ReactPlayer from 'react-player';
import Spotify from 'react-spotify-embed';
import { Link } from 'remix';

export default function MessageLayout({ message }: { message: Message }) {
	return (
		<div>
			<h1>{message.title}</h1>
			<p>{message.description}</p>
			<ReactPlayer url={message.video} />
			{message?.podcast && <Spotify link={message.podcast} />}
			<p>{message.date}</p>
			{message?.speakers?.map(speaker => (
				<p>
					<Link to={`/speakers/${speaker.id}`}>{speaker.name}</Link> -{' '}
					{speaker.role}{' '}
				</p>
			))}
		</div>
	);
}
