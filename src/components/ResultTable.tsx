import { Tag, XCircle, PlusCircle } from "react-feather";
import { Link } from "react-router-dom";

type ResultType = {
    id: string;
    name: string;
    tags: string[];
    submitted_at: string;
};

type TableProps = {
    results: ResultType[];
};

export default function Table(props: TableProps) {
    return (
        <table className="table-fixed w-full">
            <TableHeader />
            <tbody>
                {props.results.map((result) => (
                    <TableLine key={result.id} result={result} />
                ))}
            </tbody>
        </table>
    );
}

function TableHeader() {
    return (
        <thead>
            <tr className="text-left border-b">
                <th className="w-14">
                    <div className="flex content-center justify-center">
                        <input type="checkbox" className="rounded" />
                    </div>
                </th>
                <th className="py-4 px-4 w-64">Job Name</th>
                <th className="py-4 px-4">Tags</th>
                <th className="py-4 w-32 text-center">Submitted at</th>
                <th className="w-20 text-center"></th>
            </tr>
        </thead>
    );
}

function TableLine(props: { result: ResultType }) {
    return (
        <tr className="border-b odd:bg-gray-100">
            {TableColumnCheckbox(props.result.id)}
            {TableColumnJobname(props.result.name, props.result.id)}
            {TableColumnTags(props.result.tags)}
            {TableColumnSubmittedat(props.result.id)}
            {TableColumnActions()}
        </tr>
    );
}

function TableColumnCheckbox(resultId: string) {
    return (
        <td>
            <div className="flex content-center justify-center">
                <input
                    id={"checkbox_" + resultId}
                    type="checkbox"
                    className="rounded"
                />
            </div>
        </td>
    );
}

function TableColumnJobname(name: string, id: string) {
    return (
        <td className="px-4 truncate">
            <Link
                to={{
                    pathname: "/result",
                    search: "?id=" + id,
                }}
                className="text-blue-ovh-light hover:text-blue-ovh-dark underline text-base"
            >
                {name}
            </Link>
        </td>
    );
}

function TableColumnTags(tags: string[]) {
    function createTagBadge(text: string) {
        return (
            <div className="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
                <Tag size={18} className="pr-1" />
                <div className="text-xs font-semibold">{text}</div>
            </div>
        );
    }

    return (
        <td className="px-4">
            <div className="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin">
                {tags.map((tag, index) => createTagBadge(tag))}
            </div>
        </td>
    );
}

function TableColumnSubmittedat(submitted_at: string) {
    return <td className="px-4 text-xs text-center">{submitted_at}</td>;
}

function TableColumnActions() {
    return (
        <td className="px-4">
            <div className="flex flex-row justify-start space-x-1">
                <button>
                    <XCircle size={20} className="text-red-500" />
                </button>
                <button>
                    <PlusCircle size={20} className="text-blue-500" />
                </button>
            </div>
        </td>
    );
}
