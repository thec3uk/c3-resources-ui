import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { LoaderFunction, Outlet, useLoaderData, useNavigate } from 'remix';

export const loader: LoaderFunction = async ({ request }) => {
	let term = new URL(request.url).searchParams.get('q');
	return term;
};

export default function Index() {
	const term = useLoaderData<string>();
	return (
		<>
			<InputGroup mb={2}>
				<InputLeftElement
					pointerEvents="none"
					children={<SearchIcon color="gray.300" />}
				/>
				<Input
					type="text"
					placeholder="Search messages"
					bg="white"
					color={'gray.500'}
					maxW={400}
					value={term}
					onChange={e => console.log(e.target.value)}
				></Input>
			</InputGroup>
		</>
	);
}

export function ErrorBoundary({ error }: { error: any }) {
	console.error(error);
	return (
		<div>
			<p>An error occurred</p>
			<p>{error}</p>
		</div>
	);
}
