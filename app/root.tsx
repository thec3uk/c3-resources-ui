import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';
import { ChakraProvider, VStack, Container } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import Header from './components/header';

const theme = extendTheme({
	colors: {
		brand: {
			100: '#f7fafc',
			// ...
			900: '#1a202c',
		},
	},
	fonts: {
		body: 'Montserrat, sans-serif',
		heading: 'Montserrat, sans-serif',
		mono: 'Menlo, monospace',
	},
});

export const meta: MetaFunction = () => {
	return { title: 'The C3 Church' };
};

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<ChakraProvider theme={theme}>
					<VStack width="100%">
						<Header />
						<Outlet />
					</VStack>
					<ScrollRestoration />
					<Scripts />
					{process.env.NODE_ENV === 'development' && <LiveReload />}
				</ChakraProvider>
			</body>
		</html>
	);
}
