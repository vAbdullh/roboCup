const Loading = () => {
    return (Array(2).fill().map((_, index) => (
        <div key={index} className="flex flex-col gap-3 p-3 rounded-md col-span-1 animate-pulse bg-white shadow-xl">
            <p className="h-4 bg-gray-300 rounded w-3/4"></p>
            <p className="h-4 bg-gray-300 rounded w-3/4"></p>
            <p className="h-4 bg-gray-300 rounded w-1/2"></p>
            <p className="h-4 bg-gray-300 rounded w-full"></p>
            <p className="h-4 bg-gray-300 rounded w-1/2"></p>
            <div className="flex gap-2">
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
        </div>
    )))
}
export default Loading;