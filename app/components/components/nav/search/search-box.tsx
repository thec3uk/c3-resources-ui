import * as React from "react";

import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";

import { SearchIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { Link } from "remix";

export interface SearchBoxProps extends SearchBoxProvided {
  showSearch: boolean;
  setShowSearch: Function;
}

const SearchBox = ({ refine, currentRefinement, showSearch, setShowSearch }: SearchBoxProps) => {
  return (
    <div className="flex items-center space-x-2">
      {/* <Transition
        show={showSearch}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0">
        <form className={`mt-1 border-b border-gray-300 focus-within:border-red-500`}>
          <input
            type="search"
            name="q"
            id="name"
            className="block w-full border-0 border-b border-transparent bg-gray-50 focus:border-red-500 focus:ring-0 sm:text-sm"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => {
              refine(e.target.value);
            }}
            value={currentRefinement}
          />
        </form>
      </Transition> */}
      <Link to={"/messages"}>
        <SearchIcon className="w-8 h-8 text-black cursor-pointer hover:text-gray-600 lg:w-6 lg:h-6" />
      </Link>
    </div>
  );
};

export default connectSearchBox(SearchBox);
