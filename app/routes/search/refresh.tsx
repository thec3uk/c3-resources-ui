import { LoaderFunction, useLoaderData } from 'remix';
import { populateIndex } from './search.loader';

export const loader: LoaderFunction = async () => {
	try {
		await populateIndex();
		return 'Success';
	} catch {
		return 'Error';
	}
};

export default function Refresh() {
	const status = useLoaderData<string>();
	return <p>Index Refreshed: {status}</p>;
}
