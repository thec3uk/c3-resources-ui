import * as React from "react";
// import { graphql, useStaticQuery } from 'gatsby'
// import { useMergePrismicPreviewData } from 'gatsby-plugin-prismic-previews'
// import "./layout.css";

import Footer from "./footer";
import NavBar from "./nav";
import Announcement from "./announcement";
import gql from "graphql-tag";
import { client, GraphqlResponse } from "~/types/graphql.types";
import { CmsMeta } from "~/types/cms.types";
import { LoaderFunction, useLoaderData } from "remix";

export type FooterQueryResponse = {
  allStatic_footers: { edges: [{ node: Footer; __typename: string }]; __typename: string };
};

export type Footer = {
  body: [
    {
      primary: {
        title: string;
      };
      fields: [
        {
          link_url: {
            url?: string;
            // permanent?: boolean;
            // destination?: {
            //   url?: string;
            //   target?: string;
            //   _meta: CmsMeta;
            // };
            _meta: CmsMeta;
          };
          link_title: string;
        }
      ];
    }
  ];
};

const FOOTER_DATA = gql`
  fragment document on _Document {
    _meta {
      uid
      type
    }
  }

  fragment externalLink on _ExternalLink {
    url
    target
  }

  fragment files on _FileLink {
    url
    name
  }

  fragment redirects on Redirect {
    _meta {
      uid
    }
    destination {
      ...externalLink
      ...files
      ...document
    }
  }

  fragment footerList on Static_footerBodyLink_list {
    fields {
      link_url {
        ...document
        ...externalLink
        ...redirects
      }
      link_title
    }
    primary {
      title
    }
  }

  query footerQuery {
    allStatic_footers {
      edges {
        node {
          body {
            ...footerList
          }
        }
      }
    }
  }
`;

export async function getFooter(): Promise<GraphqlResponse<Footer>> {
  const response = await client.query<FooterQueryResponse>({
    query: FOOTER_DATA,
  });

  return { ...response, data: response.data.allStatic_footers.edges[0].node };
}

// export const loader: LoaderFunction = async ({ request }) => {
//   const response = await client.query<FooterQueryResponse>({
//     query: FOOTER_DATA,
//   });

//   console.log(response);

//   return { ...response, data: response.data.allStatic_footers.edges[0].node };
// };
