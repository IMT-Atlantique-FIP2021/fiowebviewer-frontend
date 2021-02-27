
export default function ResultCompare() {
    return (
        <div className="px-5 py-3">
            Delete the result(s) ?
            <button
                className="disabled:opacity-50 disabled:bg-gray-400 bg-red-500 hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                No.
            </button>
        </div>
        
    )
}