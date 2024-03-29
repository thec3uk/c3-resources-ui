function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
	if (!host) {
		throw new Error('Could not determine domain URL.');
	}
	const protocol = host.includes('localhost') ? 'http' : 'https';
	return `${protocol}://${host}`;
}

function removeTrailingSlash(s: string) {
	return s.endsWith('/') ? s.slice(0, -1) : s;
}

function toTitleCase(slug: string) {
	return slug.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
	});
}

function typedBoolean<T>(
	value: T
): value is Exclude<T, '' | 0 | false | null | undefined> {
	return Boolean(value);
}

export { typedBoolean, removeTrailingSlash, getDomainUrl, toTitleCase };
