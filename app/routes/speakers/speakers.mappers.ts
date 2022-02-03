import { CmsSpeaker, getUid, getText, getId } from '~/types/cms.types';
import { Speaker } from './speakers.types';

export function mapSpeaker(speaker: CmsSpeaker): Speaker {
	return {
		id: getId(speaker),
		uid: getUid(speaker),
		name: getText(speaker.name),
		thumbnail: speaker.thumbnail,
		hero: speaker.hero,
		role: getText(speaker.role),
		bio: getText(speaker.bio),
	};
}

export function mapSpeakers(
	cmsSpeakers?: Array<{ speaker: CmsSpeaker }>
): Array<Speaker> | undefined {
	return cmsSpeakers
		?.filter(link => link.speaker !== null)
		?.map((link: { speaker: CmsSpeaker }) => mapSpeaker(link?.speaker));
}
