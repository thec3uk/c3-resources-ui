import { CmsSpeaker, getId, getText } from '~/types/cms.types';
import { Speaker } from './speakers.types';

export function mapSpeaker(speaker: CmsSpeaker): Speaker {
	return {
		id: getId(speaker),
		name: getText(speaker.name),
		thumbnail: speaker.thumbnail,
		role: getText(speaker.role),
		bio: getText(speaker.bio),
	};
}
