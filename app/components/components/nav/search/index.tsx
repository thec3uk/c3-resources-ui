import { createRef, default as React, useState, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import algoliasearch from "algoliasearch/lite";

import SearchResult from "./result";
import SearchBox from "./search-box";
import { useNavigate } from "remix";
// import useClickOutside from './use-click-outside'

export default function Search({ indices }) {
  const rootRef = createRef();
  let navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const searchClient = useMemo(() => algoliasearch("I2N55PC133", "c7d06d28a18680f32bb377222c532d26"), []);

  // useClickOutside(rootRef, () => setFocus(false))

  return (
    <div ref={rootRef} className="flex flex-col justify-end">
      <InstantSearch
        searchClient={searchClient}
        indexName="c3_resources"
        onSearchStateChange={({ query }) => navigate(`/messages?q=${query}`)}>
        <SearchBox showSearch={showSearch} setShowSearch={setShowSearch} />
        {/* <SearchResult indices={indices} show={showSearch && query && query.length > 0} /> */}
      </InstantSearch>
    </div>
  );
}
