import { connectSearchBox } from "react-instantsearch-dom";
import { SearchBoxProvided } from "react-instantsearch-core";
import { SearchIcon } from "@heroicons/react/solid";

export interface SearchBoxProps extends SearchBoxProvided {}

const SearchBox = ({ currentRefinement, refine }: SearchBoxProps) => {
  return (
    <div className="flex items-center space-x-2">
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

      {/* <SearchIcon
        className="w-8 h-8 text-black cursor-pointer hover:text-gray-600 lg:w-6 lg:h-6"
        onClick={() => refine(currentRefinement)}
      /> */}
    </div>
  );
};

export const C3SearchBox = connectSearchBox(SearchBox);
