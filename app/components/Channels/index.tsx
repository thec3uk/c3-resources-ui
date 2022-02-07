import { Channel } from '~/routes/channels/channels.types';
import { ImageGrid } from '../ImageGrid';
import { Theme } from '../ImageGrid/imageGrid.types';

export function Channels({
	channels,
	theme,
}: {
	channels: Array<Channel>;
	theme: Theme;
}) {
	return (
		<ImageGrid
			theme={theme}
			title="Browse Channels"
			items={channels.map(channel => ({
				key: channel.uid,
				link: `/channels/${channel.uid}`,
				title: channel.name,
				thumbnail: channel.thumbnail?.url,
			}))}
		/>
	);
}
