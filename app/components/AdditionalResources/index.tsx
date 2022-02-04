import { Box, Heading, List, ListItem } from '@chakra-ui/react';
import { Resource } from '~/routes/series/series.types';

export function AdditionalResources({
	resources,
}: {
	resources?: Array<Resource>;
}) {
	return resources ? (
		<Box p={10} w={'100%'} bg={'gray.300'}>
			<Heading as="h2" size={'md'}>
				Additional Resources
			</Heading>
			<Box paddingTop={2}>
				<List>
					{resources?.map(resource => (
						<ListItem key={resource.title}>
							<a href={resource.url} target={'_blank'}>
								{resource.title}{' '}
								{resource.description && (
									<span> - {resource.description}</span>
								)}
							</a>
						</ListItem>
					))}
				</List>
			</Box>
		</Box>
	) : (
		<></>
	);
}
