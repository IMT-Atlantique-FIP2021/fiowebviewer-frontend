import { Tag, XCircle, PlusCircle } from "react-feather";

export default function Table(props) {
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

function TableLine(props) {
    return (
        <tr className="border-b odd:bg-gray-100">
            <td>
                <div className="flex content-center justify-center">
                    <input
                        id={"checkbox_" + props.result.id}
                        type="checkbox"
                        className="rounded"
                    />
                </div>
            </td>
            <td className="px-4 truncate">
                <a
                    href={"/result/" + props.result.id}
                    className="text-blue-ovh-light hover:text-blue-ovh-dark underline text-base"
                >
                    {props.result.name}
                </a>
            </td>
            <td className="px-4">
                <div className="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin">
                    {props.result.tags.map((tag, index) => (
                    <TableTag key={index + "_" + tag} text={tag} />
                    ))}
                </div>
            </td>
            <td className="px-4 text-xs text-center">
                {props.result.submitted_at}
            </td>
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
        </tr>
    );
}

function TableTag(props) {
    return (
        <div className="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
            <Tag size={18} className="pr-1" />
            <div className="text-xs font-semibold">{props.text}</div>
        </div>
    );
}
