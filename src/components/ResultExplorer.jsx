import { Tag, XCircle, PlusCircle } from "react-feather";

export default function Table(props) {
    return (
        <table className="shadow-md bg-white table-fixed w-full">
            <TableHeader />
            {props.results.map((result) => (
                <TableLine key={result.id} result={result} />
            ))}
        </table>
    );
}

function TableHeader() {
    return (
        <tr className="bg-green-600 text-white text-left border">
            <th className="w-10 text-center">
                <input type="checkbox" className="h-4 w-4" />
            </th>
            <th className="py-4 px-4 w-64">Job Name</th>
            <th className="py-4 px-4">Tags</th>
            <th className="py-4 w-32 text-center">Submitted at</th>
            <th className="py-4 w-32 text-center">Actions</th>
        </tr>
    );
}

function TableLine(props) {
    return (
        <tr>
            <td className="border py-2 text-center">
                <input type="checkbox" className="h-4 w-4" />
            </td>

            <td className="border px-4 text-left truncate">
                <a href={"/result/"+props.result.id}>{props.result.name}</a>
            </td>

            <td className="border px-4">
                <div className="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200">
                    {props.result.tags.map((tag, index) => (
                        <TableTag key={index + "_" + tag} text={tag} />
                    ))}
                </div>
            </td>

            <td className="border px-4 text-xs">{props.result.submitted_at}</td>
            
            <td className="border px-4">
                <div className="flex flex-row justify-evenly">
                    <button className="text-red-500">
                        <XCircle />
                    </button>
                    <button className="text-blue-500">
                        <PlusCircle />
                    </button>
                </div>
            </td>
        </tr>
    );
}

function TableTag(props) {
    return (
        <div className="flex flex-row flex-none bg-gray-300 rounded-full px-2 my-1 items-center">
            <Tag className="w-4 pr-1" />
            <div className="font-bold text-black text-xs">{props.text}</div>
        </div>
    );
}
