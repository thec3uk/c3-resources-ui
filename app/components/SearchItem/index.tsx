import { Box, Button, HStack, LinkOverlay } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'remix';
import { IImageBoxProps } from '../ImageGrid/imageGrid.types';
import { ResponsiveVideo } from '../ResponsiveVideo';

export function SearchItem({ box }: { box: IImageBoxProps }) {
	const [playPreview, setPlayPreview] = useState<string>('');

	return (
		<Box
			onMouseEnter={() => {
				setPlayPreview(box.key);
			}}
			onMouseLeave={() => setPlayPreview('')}
		>
			{playPreview === box.key && box.trailer ? (
				<Box animation={'fadInAnimation ease 1s'} minW={410} minH={250}>
					<ResponsiveVideo
						video={`${box.trailer}autoplay=1`}
						playing
					/>
				</Box>
			) : (
				<Box
					borderWidth="1px"
					borderRadius="lg"
					borderColor="gray.300"
					overflow="hidden"
					margin={2}
					minW={400}
					minH={250}
					bgImage={`url('${box.thumbnail}')`}
					bgSize={'cover'}
				/>
			)}
			<Box>
				<HStack>
					<Link to={box.link}>
						<Box
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
							isTruncated
							color={'gray.800'}
						>
							{box.title}
						</Box>
						<Box
							as="h6"
							lineHeight="tight"
							isTruncated
							color={'gray.500'}
						>
							{box.subTitle}
						</Box>
					</Link>
					{playPreview && (
						<Link to={`${box.link}?playing=true`}>
							<Button>{'Watch >>>'}</Button>
						</Link>
					)}
				</HStack>
			</Box>
		</Box>
	);
}
