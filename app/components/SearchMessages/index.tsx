import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, Configure } from "react-instantsearch-dom";
import { layout } from "../components";
import { C3SearchBox } from "../SearchBox";
import { CustomRefinementList } from "../SearchFacetList";
import { InfiniteHits } from "../InfiniteHits";

export interface SearchQueryParams {
  channel?: string;
  series?: string;
  speakers?: string;
  query?: string;
}

const searchClient = algoliasearch("I2N55PC133", "c7d06d28a18680f32bb377222c532d26");

export function SearchMessages({ queryParams }: { queryParams: SearchQueryParams }) {
  return (
    <InstantSearch indexName="c3_resources" searchClient={searchClient}>
      <layout.Main hash="">
        <Configure hitsPerPage={6} />
        <div className="flex items-center justify-between ml-2">
          <h1 className="hidden mb-4 text-4xl md:block font-title">messages</h1>
        </div>
        <InfiniteHits />
      </layout.Main>
      <layout.Aside>
        <C3SearchBox defaultRefinement={queryParams.query} />
        <div className="flex flex-col items-start pl-4 space-y-2">
          <CustomRefinementList
            attribute={"speakers"}
            title={"Speakers"}
            defaultRefinement={queryParams.speakers ? [queryParams.speakers] : []}
            searchable
          />
          <CustomRefinementList
            attribute={"channel.name"}
            title={"Channels"}
            defaultRefinement={queryParams?.channel ? [queryParams.channel] : []}
            searchable
          />
          <CustomRefinementList
            attribute={"series"}
            title={"Series"}
            defaultRefinement={queryParams?.series ? [queryParams.series] : []}
            searchable
          />
        </div>
      </layout.Aside>
    </InstantSearch>
  );
}
