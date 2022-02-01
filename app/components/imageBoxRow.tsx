import { Box, Heading, HStack, VStack, Image, LinkBox } from '@chakra-ui/react';
import { Link } from 'remix';
import { CmsImage } from '~/types/cms.types';

export interface ImageBox {
	key: string;
	link: string;
	title: string;
	thumbnail?: CmsImage;
	date?: string;
}

export enum Theme {
	light,
	dark,
}

export function ImageBoxRow({
	title,
	boxes,
	theme,
}: {
	title: string;
	boxes: Array<ImageBox>;
	theme: Theme;
}) {
	return (
		<Box p={10} w={'100%'} bg={theme === Theme.dark ? 'gray.300' : 'white'}>
			<Heading as="h4" size={'md'} mb={2}>
				{title}
			</Heading>
			<HStack justify={'space-evenly'}>
				{boxes.map(box => {
					return (
						<Box
							key={box.key}
							maxW="sm"
							borderWidth="1px"
							borderRadius="lg"
							borderColor={
								theme === Theme.light ? 'gray.300' : 'black'
							}
							overflow="hidden"
							width={60}
							margin={2}
						>
							<Link to={box.link}>
								<Image
									src={box.thumbnail?.url}
									alt={box.thumbnail?.alt}
								/>
								<Box
									p="6"
									borderTop="1px"
									borderColor={
										theme === Theme.light
											? 'gray.300'
											: 'black'
									}
									bg={'white'}
								>
									<Box
										mt="1"
										fontWeight="semibold"
										as="h4"
										lineHeight="tight"
										isTruncated
									>
										{box.title}{' '}
										{box.date && <span>- {box.date}</span>}
									</Box>
								</Box>
							</Link>
						</Box>
					);
				})}
			</HStack>
		</Box>
	);
}
