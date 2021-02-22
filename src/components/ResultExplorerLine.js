import { PlusCircle, XCircle } from "react-feather";
import ResultExplorerTag from "./ResultExplorerTag";

function ResultExplorerLine(props) {
  return (
    <tr>
      <td className="border py-2 text-center">
        <input type="checkbox" className="h-4 w-4" />
      </td>
      <td className="border px-4 text-left truncate">{ props.result.name }</td>
      <td className="border px-4">
        <div className="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-ovh_blue scrollbar-track-gray-200">
          { props.result.tags.map((tag) => (
              <ResultExplorerTag text={ tag } />
          )) }
        </div>
      </td>
      <td className="border px-4 text-xs">{ props.result.submitted_at }</td>
      <td className="border px-4">
        <div className="flex flex-row justify-evenly">
          <button className="text-red-500">
            <XCircle/>
          </button>
          <button className="text-blue-500">
            <PlusCircle/>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ResultExplorerLine;