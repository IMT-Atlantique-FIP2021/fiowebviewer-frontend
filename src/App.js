import {
  Activity,
  BookOpen,
  Download,
  Info,
  List,
  Minimize2,
  Moon,
  Sun,
  Trash,
} from "react-feather";
import ResultExplorerTable from "./components/ResultExplorerTable";
import ResultListTest from "./assets/resultList.json";

function App() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col flex-none h-screen w-64">
        <div className="h-12 flex-none bg-ovh_blue flex items-center justify-center space-x-2">
          <Activity className="text-white" />
          <span className="font-semibold text-2xl text-white pr-4">
            FIO Analyzer
          </span>
        </div>

        <div className="flex flex-col flex-auto bg-gray-300 dark:bg-gray-800 dark:text-white">
          <div className="flex flex-col space-y-2">
            <div className="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
              OVERVIEW
            </div>
            <div className="group flex space-x-2 pl-4 items-center cursor-pointer text-blue-600">
              <List />
              <div>Job Browser</div>
            </div>

            <div className="group flex space-x-2 pl-4 items-center cursor-pointer">
              <Download className="opacity-50 group-hover:opacity-100" />
              <div>Download script</div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
              LIST ACTION
            </div>
            <div className="group flex space-x-2 pl-4 items-center cursor-pointer">
              <Minimize2 className="opacity-50 group-hover:opacity-100" />
              <div>Compare selected</div>
            </div>

            <div className="group flex space-x-2 pl-4 items-center cursor-pointer">
              <Trash className="opacity-50 group-hover:opacity-100" />
              <div>Delete selected</div>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
              INFORMATION
            </div>
            <div className="group flex space-x-2 pl-4 items-center cursor-pointer">
              <BookOpen className="opacity-50 group-hover:opacity-100" />
              <div>Docs</div>
            </div>

            <div className="group flex space-x-2 pl-4 items-center cursor-pointer">
              <Info className="opacity-50 group-hover:opacity-100" />
              <div>About</div>
            </div>
          </div>

          <div className="flex-grow"></div>

          <div className="font-light text-sm text-center pb-4 pt-4 flex-none">
            OVHcloud © 2021
          </div>
        </div>
      </div>

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
          <ResultExplorerTable resultList={ResultListTest} />
        </div>
      </div>
    </div>
  );
}

export default App;
