import { Box } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

export function ResponsiveVideo({
	video,
	playing = false,
}: {
	video: string;
	playing?: boolean;
}) {
	return (
		<Box
			className="player-wrapper"
			paddingTop={'60%'}
			position={'relative'}
			boxShadow={'0px 0px 5px 1px grey'}
		>
			<ReactPlayer
				url={video}
				className="react-player"
				playing={playing}
				width="100%"
				height="100%"
			/>
		</Box>
	);
}
