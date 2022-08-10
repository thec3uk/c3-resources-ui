import { connectRefinementList } from "react-instantsearch-dom";
import { RefinementListProvided } from "react-instantsearch-core";

export interface FacetItem {
  label: string;
  value: Array<string>;
  count: number;
  isRefined: boolean;
}

export interface IRefinementList {
  attribute: string;
  operator: string;
  showMore: boolean;
  limit: number;
  showMoreLimit: number;
  facetOrdering: boolean;
}

export interface SearchFacetListProps extends RefinementListProvided {
  title: string;
}

const SearchFacetList: React.FC<SearchFacetListProps> = ({ items, refine, title }) => {
  return (
    <>
      <h2 className="text-lg font-bold">{title}</h2>
      {items.map((m) => {
        return (
          <div key={m.label}>
            <button
              className={`border border-solid border-gray-200 px-2 py-1 rounded ml-2 ${
                m.isRefined ? "bg-red-500" : "bg-white"
              } hover:bg-red-300`}
              id={m.label}
              onClick={(e) => {
                e.preventDefault();
                refine(m.value);
              }}>
              {m.label}
            </button>
          </div>
        );
      })}
    </>
  );
};

export const CustomRefinementList = connectRefinementList(SearchFacetList);
