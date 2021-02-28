
export default function ResultDelete() {
    return (
        <div className="px-5 py-3 space-y-6">
            <div className="flex justify-center p-4">Delete the result(s) ?</div>
            <div className="flex justify-center p-4 space-x-44">
                <button
                    className="disabled:opacity-50 disabled:bg-gray-400 bg-blue-ovh-light hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
                >
                Yes
                </button>
                <button
                    className="disabled:opacity-50 disabled:bg-gray-400 bg-red-500 hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
                >
                No
                </button>
            </div>
        </div>
        
    )
}