import gql from "graphql-tag";
import { Footer } from "~/components/components/layout.gql";
import { CmsSeries } from "~/types/cms.types";
import { ArrayResult, PagedArrayResult } from "~/types/graphql.types";
import { Series } from "./series.types";

export interface AllSeriesQueryResponse {
  allSeriess: PagedArrayResult<CmsSeries>;
}

export interface SeriesQueryResponse {
  series: Series;
}

export const SERIES_FRAGMENT = gql`
  fragment series on Series {
    _meta {
      id
      uid
    }
    title
    description
    thumbnail
    hero
    linked_resources {
      resources {
        ... on Resource {
          title
          description
          link {
            ... on _ExternalLink {
              url
            }
          }
        }
      }
    }
  }
`;

// the date here should probably be a start date added to the model.
export const ALL_SERIES = gql`
  query allSeries($after: String) {
    allSeriess(sortBy: meta_lastPublicationDate_DESC, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...series
        }
      }
    }
  }
  ${SERIES_FRAGMENT}
`;

export const SERIES_BY_ID = gql`
  query series($uid: String!) {
    series(uid: $uid, lang: "en-gb") {
      ...series
    }
  }
`;
