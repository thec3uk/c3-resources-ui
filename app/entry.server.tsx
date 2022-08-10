import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";

import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./createEmotionCache";
import ServerStyleContext from "./context.server";
import { routes as otherRoutes } from "./other-routes.server";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  for (const handler of otherRoutes) {
    const otherRouteResponse = await handler(request, remixContext);
    if (otherRouteResponse) return otherRouteResponse;
  }

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  const markup = renderToString(
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer context={remixContext} url={request.url} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
