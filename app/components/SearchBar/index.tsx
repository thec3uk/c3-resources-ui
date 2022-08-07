import { SearchIcon } from "@heroicons/react/solid";
import { Link } from "remix";

export function SearchBar({ link, title, placeholder }: { link: string; title?: string; placeholder?: string }) {
  return (
    <div className="flex flex-row p-4">
      <h1 className="mb-8 text-xl font-semibold">{title}</h1>
      <Link to={link}>
        <button className="font-normal rounded-lg">
          <SearchIcon className="w-8 h-8 mr-4 text-black cursor-pointer hover:text-gray-600 lg:w-6 lg:h-6" />
          {placeholder || "Search..."}
        </button>
      </Link>
    </div>
  );
}
