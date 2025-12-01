export default function Loading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div>
                <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Toolbar Skeleton */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center">
                <div className="h-10 w-full max-w-md bg-gray-200 rounded-lg"></div>
                <div className="h-4 w-20 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 h-64 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="h-4 w-32 bg-gray-200 rounded-lg"></div>
                                    <div className="h-3 w-24 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-2 mb-6">
                            <div className="h-3 w-full bg-gray-200 rounded-lg"></div>
                            <div className="h-3 w-full bg-gray-200 rounded-lg"></div>
                            <div className="h-3 w-2/3 bg-gray-200 rounded-lg"></div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <div className="h-3 w-20 bg-gray-200 rounded-lg"></div>
                            <div className="flex gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
