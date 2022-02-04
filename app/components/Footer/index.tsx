import { Box, Heading } from '@chakra-ui/react';
import { Link } from 'remix';

function SitemapSection() {
	return (
		<div>
			<Heading as="div">Sitemap</Heading>
			<ul className="mt-4">
				<Link to="/">Home</Link>
				<Link to="/sitemap.xml">Sitemap</Link>
			</ul>
		</div>
	);
}

export function Footer() {
	return <Box></Box>;
}
