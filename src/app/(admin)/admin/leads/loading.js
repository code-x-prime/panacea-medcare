export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div>
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Toolbar Skeleton */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="h-10 w-full md:w-96 bg-gray-200 rounded-lg"></div>
                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                {/* Table Skeleton */}
                <div className="p-6 space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-4 w-1/3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 w-32 bg-gray-200 rounded-lg"></div>
                                    <div className="h-3 w-20 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="h-4 w-32 bg-gray-200 rounded-lg"></div>
                            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                            <div className="h-4 w-24 bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
