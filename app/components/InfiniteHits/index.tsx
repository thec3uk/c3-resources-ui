import * as React from "react";
import { useState } from "react";
import { connectInfiniteHits } from "react-instantsearch-dom";
import { SearchIndexRecord } from "~/routes/search/search.types";
import { SearchHit } from "../SearchHit";

const C3InfiniteHits = ({
  hits,
  hasPrevious,
  hasMore,
  refinePrevious,
  refineNext,
}: {
  hits: SearchIndexRecord[];
  hasPrevious: boolean;
  hasMore: boolean;
  refinePrevious: () => void;
  refineNext: () => void;
}) => {
  const [playPreview, setPlayPreview] = useState<string>("");

  return (
    <div>
      {/* <button disabled={!hasPrevious} onClick={refinePrevious}>
        Show previous
      </button> */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {hits.map((hit) => (
          <SearchHit key={hit.id} hit={hit} playPreview={playPreview} setPlayPreview={setPlayPreview} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center w-full mb-8">
          <button
            onClick={refineNext}
            className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-red-500 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export const InfiniteHits = connectInfiniteHits(C3InfiniteHits);
