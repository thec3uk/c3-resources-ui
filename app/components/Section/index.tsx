import { Box } from '@chakra-ui/react';
import { Theme } from '../ImageGrid/imageGrid.types';

export function Section({
	onEnter,
	onLeave,
	theme = Theme.dark,
	children,
}: {
	theme?: Theme;
	onEnter?: () => void;
	onLeave?: () => void;
	children: JSX.Element | JSX.Element[];
}) {
	return (
		<Box
			w={'100%'}
			bg={theme === Theme.dark ? 'gray.300' : 'white'}
			pl={[2, 5, 5]}
			pr={[2, 5, 5]}
			pt={8}
			pb={8}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			onTouchStart={onEnter}
		>
			{children}
		</Box>
	);
}
