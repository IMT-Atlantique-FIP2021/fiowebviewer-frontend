import React from "react";
import { Link } from "react-router-dom";

export default function ResultDelete() {
    return (
        <div className="px-5 py-3 space-y-6">
            <div className="flex justify-center p-4">Delete the result(s) ?</div>
            <div className="flex justify-center p-4 space-x-44">
            {GoBackButton(() =>
                        console.log("Clicked!")
                    )}
            {ConfirmDeleteButton(() =>
                        console.log("Clicked!")
                    )}
            </div>
        </div>
        
    )
}

function ConfirmDeleteButton(onClick: () => void) {

    return (
        <Link
            to={{
                pathname: "/",
            }}
        >
            <button
                onClick={onClick}
                className="bg-red-500 hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                No
            </button>
        </Link>
    );
}

function GoBackButton(onClick: () => void) {
    // Call to @api/delete missing

    return (
        <Link
            to={{
                pathname: "/",
            }}
        >
            <button
                onClick={onClick}
                className="bg-blue-ovh-light hover:opacity-100 opacity-80 p-2 w-64 font-semibold border rounded text-white"
            >
                Yes
            </button>
        </Link>
    );
}