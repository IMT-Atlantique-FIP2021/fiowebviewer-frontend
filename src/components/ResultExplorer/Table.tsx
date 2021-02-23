import ResultLine from "./Line";
import { Result } from "./Line";

type TableProps = {
  results: Result[];
};

function ResultTable(props: TableProps) {
  return (
    <table className="shadow-md bg-white table-fixed w-full">
      <tr className="bg-ovh_blue text-white text-left border">
        <th className="w-10 text-center">
          <input type="checkbox" className="h-4 w-4" />
        </th>
        <th className="py-4 px-4 w-64">Job Name</th>
        <th className="py-4 px-4">Tags</th>
        <th className="py-4 w-32 text-center">Submitted at</th>
        <th className="py-4 w-32 text-center">Actions</th>
      </tr>

      {props.results.map((result) => (
        <ResultLine key={result.id} result={result} />
      ))}
    </table>
  );
}

export default ResultTable;