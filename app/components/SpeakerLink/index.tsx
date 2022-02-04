import { Link } from 'remix';
import { Speaker } from '~/routes/speakers/speakers.types';

export function SpeakerLink({ speaker }: { speaker: Speaker }) {
	return <Link to={`/speakers/${speaker.uid}`}>{speaker.name}</Link>;
}
