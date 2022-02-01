import { CmsChannel, getId, getUid, getText } from '~/types/cms.types';
import { Channel } from './channels.types';

export function mapChannel(channel: CmsChannel): Channel {
	return {
		uid: getUid(channel),
		id: getId(channel),
		name: getText(channel.name),
		description: getText(channel.description),
		hero: channel.hero,
		thumbnail: channel.thumbnail,
	};
}
