import { Sun, Moon } from 'react-feather';
import ResultTable from "./ResultExplorer/Table";

import ResultListTest from "../assets/resultList.json";

function Content() {
  return (
    <div className="flex flex-col w-screen">
      <div className="flex-none bg-blue-600 h-12 flex justify-end items-center pr-8">
        <div className="flex flex-row text-white">
          <button className="hidden dark:visible">
            <Sun />
          </button>
          <button className="visible dark:hidden">
            <Moon />
          </button>
        </div>
      </div>
      <div className="flex-auto dark:bg-gray-600 p-4">
        <div className="mb-3 pb-1 font-semibold text-2xl border-b-2 dark:text-white">
          Job Browser
        </div>
        <ResultTable results={ResultListTest} />
      </div>
    </div>
  );
}

export default Content;
