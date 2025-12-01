export default function Loading() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div>
                <div className="h-8 w-64 bg-gray-200 rounded-lg mb-2"></div>
                <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 h-32">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-xl"></div>
                            <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                        </div>
                        <div className="h-8 w-12 bg-gray-200 rounded-lg mb-2"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded-lg"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Skeleton */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 h-96">
                    <div className="flex justify-between items-center mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="space-y-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <div className="h-4 w-3/4 bg-gray-200 rounded-lg mb-2"></div>
                                    <div className="h-3 w-1/2 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Skeleton */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 h-64">
                    <div className="h-6 w-32 bg-gray-200 rounded-lg mb-6"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-14 bg-gray-100 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
