import { SearchIcon } from "@heroicons/react/solid";
import { Speaker } from "~/routes/speakers/speakers.types";

export function SearchFacets({ speakers }: { speakers?: Array<Speaker> }) {
  return (
    <div className="flex flex-col space-y-4 align-start">
      <h1 className="text-sm">Speakers</h1>
      <div>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        </div>
        <input type="input" placeholder="Search speakers..." />
      </div>
      {speakers?.map((s) => (
        <button key={s.id} className="ml-2 rounded" id={s.id} onClick={() => {}}>
          {s.name}
        </button>
      ))}
    </div>
  );
}
