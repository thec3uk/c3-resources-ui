import gql from "graphql-tag";
import { CmsMessage } from "~/types/cms.types";
import { PagedArrayResult } from "~/types/graphql.types";

export interface AllSearchDataQueryResponse {
  allMessages: PagedArrayResult<CmsMessage>;
}

export const SEARCH_DATA = gql`
  query searchData($after: String) {
    allMessages(after: $after, sortBy: date_ASC) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          _meta {
            id
            uid
          }
          title
          description
          date
          thumbnail
          trailer
          speakers {
            speaker {
              ... on Speaker {
                name
              }
            }
          }
          channel {
            ... on Channel {
              name
              _meta {
                uid
                id
              }
              thumbnail
            }
          }
          series {
            ... on Series {
              title
            }
          }
        }
      }
    }
  }
`;
