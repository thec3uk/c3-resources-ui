import {
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { withEmotionCache } from "@emotion/react";
import React from "react";
import Layout from "./components/components/layout";
import ServerStyleContext from "./context.server";
import ClientStyleContext from "./context.client";
import styles from "~/styles/global.css";
import twstyles from "./styles/tailwind.css";

import { layout, components } from "./components/components";
import { GraphqlResponse } from "./types/graphql.types";
import { Footer, getFooter } from "./components/components/layout.gql";

export const meta: MetaFunction = () => {
  return { title: "The C3 Church" };
};

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: twstyles },
  ];
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  const background = <img src={"/BackgroundRed.jpg"} alt={"red logo bg"} />;
  return (
    <Document title="The C3 Church - Error">
      <Layout noFooter>
        <layout.Hero background={background} fullbleed>
          <h1 className="font-title font-bold text-5.5xl lowercase">Something went wrong</h1>
          <div className="mt-4 font-sans text-xl">
            <p>
              Looks like we weren't expecting that. We have encountered an issue completing that request for you. Please
              head to the <Link to="/">home page</Link> and try again. Or try
              <a href="mailto:hello@thec3.uk"> contacting us here.</a>
            </p>
          </div>
        </layout.Hero>
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = (
        <>
          <p>
            Thanks for visiting our website! We are sorry you've not found what you are looking for yet. Here are some
            things places you might find helpful to connect in with us:
          </p>
          <ul className="mt-4 space-y-4">
            <li>
              {/* <ListIcon as={LinkIcon}></ListIcon> */}
              <Link to="/">Home Page</Link>
            </li>
            <li>
              {/* <ListIcon as={LinkIcon}></ListIcon> */}
              <Link to="/messages">Recent Messages</Link>
            </li>
            <li>
              {/* <ListIcon as={ExternalLinkIcon}></ListIcon> */}
              <a href="https://thec3.uk">The C3 Church home page</a>
            </li>
          </ul>
        </>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }
  const background = <img src={"/BackgroundRed.jpg"} alt={"red logo bg"} />;

  return (
    <Document title={`The C3 Church - ${caught.status} - ${caught.statusText}`}>
      <Layout noFooter>
        <layout.Hero background={background} fullbleed>
          <h1 className="font-title font-bold text-5.5xl lowercase">
            {caught.status}: {caught.statusText}
          </h1>
          <div className="mt-4 font-sans text-xl">{message}</div>
        </layout.Hero>
      </Layout>
    </Document>
  );
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const serverSyleData = React.useContext(ServerStyleContext);
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  React.useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="robots" content="index, follow" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        {serverSyleData?.map(({ key, ids, css }) => (
          <style
            key={key}
            data-emotion={`${key} ${ids.join(" ")}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: css }}
          />
        ))}
        <script
          async
          defer
          data-website-id="e241b55a-6996-4e7a-b3f2-93c19fc8185f"
          src="https://analytics.myc3.life/umami.js"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
});

export const loader: LoaderFunction = async () => {
  return await getFooter();
};

export default function App() {
  const { data: footer } = useLoaderData<GraphqlResponse<Footer>>();

  return (
    <Document>
      <Layout footer={footer}>
        <Outlet />
      </Layout>
    </Document>
  );
}
