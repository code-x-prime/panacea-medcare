"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
            <p className="text-gray-500 max-w-md mb-6">
                We encountered an error while fetching data. This might be due to a database connection issue.
            </p>
            <button
                onClick={() => reset()}
                className="flex items-center gap-2 px-6 py-3 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors"
            >
                <RefreshCw className="w-4 h-4" />
                Try Again
            </button>
        </div>
    );
}
