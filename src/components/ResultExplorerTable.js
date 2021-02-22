import ResultExplorerLine from "./ResultExplorerLine";

function ResultExplorerTable(props) {
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

      { props.resultList.map((result) => (
        <ResultExplorerLine result={result} />
      )) }

    </table>
  );
}

export default ResultExplorerTable;