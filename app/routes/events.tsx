import {
	Heading,
	Button,
	HStack,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import fetch from 'node-fetch';
import { useLoaderData } from 'remix';

export async function loader() {
	return await fetch('https://api.churchsuite.co.uk/v1/calendar/event/1016', {
		headers: {
			'X-Account': 'thec3',
			'X-Application': 'zapier.api',
			'X-Auth': 'keyyzyy5l9uqicjacdtm',
		},
	});
}

export default function Events() {
	const data = useLoaderData();

	return (
		<HStack>
			<form method="post" action="/signup">
				<Heading as="h3" size={'md'}>
					{data.name}
				</Heading>
				<FormControl>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<Input id="email" type="email" name="email" />
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="firstName">First name</FormLabel>
					<Input id="firstName" name="firstName" type="text" />
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="lastName">Last name</FormLabel>
					<Input id="lastName" name="lastName" type="text" />
				</FormControl>
				<input
					name="identifier"
					type="hidden"
					value={data.identifier}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</HStack>
	);
}
