import {
	Link,
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useCatch,
} from 'remix';
import type { MetaFunction } from 'remix';
import {
	Box,
	ChakraProvider,
	Divider,
	Heading,
	Text,
	List,
	ListItem,
	ListIcon,
	VStack,
} from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { withEmotionCache } from '@emotion/react';
import React from 'react';
import { Layout } from './components/Layout';
import ServerStyleContext from './context.server';
import ClientStyleContext from './context.client';
import styles from '~/styles/global.css';
import { ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons';

export const meta: MetaFunction = () => {
	return { title: 'The C3 Church' };
};

const theme = extendTheme({
	fonts: {
		body: 'Montserrat, sans-serif',
		heading: 'Montserrat, sans-serif',
		mono: 'Menlo, monospace',
	},
});

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);

	return (
		<Document title="The C3 Church - Error">
			<Layout>
				<Box
					bgImage={'url(/backgroundRed.jpg)'}
					bgSize={'cover'}
					p={20}
					color={'white'}
				>
					<Heading as="h1">Something went wrong</Heading>
				</Box>
				<VStack
					pt={10}
					ml={'auto'}
					mr={'auto'}
					w={'80%'}
					align={'start'}
				>
					<Text>
						Looks like we weren't expecting that. We have
						encountered an issue completing that request for you.
						Please head to the <Link to="/">home page</Link> and try
						again. Or try
						<a href="mailto:hello@thec3.uk"> contacting us here.</a>
					</Text>
				</VStack>
			</Layout>
		</Document>
	);
}

export function CatchBoundary() {
	let caught = useCatch();

	let message;
	switch (caught.status) {
		case 401:
			message = (
				<Text>
					Oops! Looks like you tried to visit a page that you do not
					have access to.
				</Text>
			);
			break;
		case 404:
			message = (
				<>
					<Text>
						Thanks for visiting our website! We are sorry you've not
						found what you are looking for yet. Here are some things
						places you might find helpful to connect in with us:
					</Text>
					<List spacing={3}>
						<ListItem>
							<ListIcon as={LinkIcon}></ListIcon>
							<Link to="/">Home Page</Link>
						</ListItem>
						<ListItem>
							<ListIcon as={LinkIcon}></ListIcon>
							<Link to="/messages">Recent Messages</Link>
						</ListItem>
						<ListItem>
							<ListIcon as={ExternalLinkIcon}></ListIcon>
							<a href="https://thec3.uk">
								The C3 Church home page
							</a>
						</ListItem>
					</List>
				</>
			);
			break;

		default:
			throw new Error(caught.data || caught.statusText);
	}

	return (
		<Document
			title={`The C3 Church - ${caught.status} - ${caught.statusText}`}
		>
			<Layout>
				<Box
					bgImage={'url(/backgroundRed.jpg)'}
					bgSize={'cover'}
					p={20}
					color={'white'}
				>
					<Heading as="h1">
						{caught.status}: {caught.statusText}
					</Heading>
				</Box>
				<VStack
					pt={10}
					ml={'auto'}
					mr={'auto'}
					w={'80%'}
					align={'start'}
				>
					{message}
				</VStack>
			</Layout>
		</Document>
	);
}

interface DocumentProps {
	children: React.ReactNode;
	title?: string;
}

const Document = withEmotionCache(
	({ children, title }: DocumentProps, emotionCache) => {
		const serverSyleData = React.useContext(ServerStyleContext);
		const clientStyleData = React.useContext(ClientStyleContext);

		// Only executed on client
		React.useEffect(() => {
			// re-link sheet container
			emotionCache.sheet.container = document.head;
			// re-inject tags
			const tags = emotionCache.sheet.tags;
			emotionCache.sheet.flush();
			tags.forEach(tag => {
				(emotionCache.sheet as any)._insertTag(tag);
			});
			// reset cache to reapply global styles
			clientStyleData.reset();
		}, []);

		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1"
					/>
					<meta name="robots" content="index, follow" />
					{title ? <title>{title}</title> : null}
					<Meta />
					<Links />
					{serverSyleData?.map(({ key, ids, css }) => (
						<style
							key={key}
							data-emotion={`${key} ${ids.join(' ')}`}
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: css }}
						/>
					))}
				</head>
				<body>
					<ChakraProvider theme={theme}>{children}</ChakraProvider>
					<ScrollRestoration />
					<Scripts />
					{process.env.NODE_ENV === 'development' && <LiveReload />}
				</body>
			</html>
		);
	}
);

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}
