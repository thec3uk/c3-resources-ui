import { CmsSpeaker } from "~/types/cms.types";
import { client, GraphqlEdge, GraphqlResponse } from "~/types/graphql.types";
import { AllSpeakersQueryResponse, ALL_SPEAKERS, SPEAKER_BY_ID as SPEAKER_BY_UID } from "./speakers.gql";
import { mapSpeaker } from "./speakers.mappers";
import { Speaker } from "./speakers.types";

export async function getSpeakers(): Promise<GraphqlResponse<Array<Speaker>>> {
  const response = await client.query<AllSpeakersQueryResponse>({
    query: ALL_SPEAKERS,
  });
  return {
    ...response,
    data: response.data.allSpeakers.edges.map((edge: GraphqlEdge<CmsSpeaker>) => mapSpeaker(edge.node)),
  };
}

export async function getSpeaker(uid: string): Promise<Speaker | unknown> {
  const response = await client.query<AllSpeakersQueryResponse>({
    query: SPEAKER_BY_UID,
    variables: { uid },
  });

  return {
    ...response,
    data: mapSpeaker(response.data.allSpeakers.edges[0].node),
  };
}
