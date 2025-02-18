import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import Loading from "./LoadingCard";

const Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        handleGetLogs();
    }, [user.accessToken]);

    const handleGetLogs = async () => {
        setLoading(true);
        try {
            const data = await api.getLogs(user.accessToken);
            setLogs(data);
        } catch (error) {
            console.error("Error Loading logs:", error);
            toast.error(`Error Loading logs:: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="grid grid-cols-1 gap-6">
            <button disabled={loading} onClick={handleGetLogs}
                className={`py-2 px-4 text-md w-fit ml-auto bg-blue-500 text-white rounded-lg transition duration-200 flex gap-2 items-center ${loading ? 'bg-blue-900' : 'hover:bg-blue-600'}`}>
                {loading && <LoaderCircle size={24} className="animate-spin" />}Refresh
            </button>

            <div className="grid grid-col-1 md:grid-cols-2 xl:grid-cols-3 gap-2 fade-in">
                {loading ? (<Loading />) : logs.length === 0 ? (
                    <div className="p-6 text-center md:text-left text-xl font-semibold text-gray-500">No logs found</div>
                ) : (logs.sort((a, b) => b.timestamp - a.timestamp) // Sort by timestamp (latest first)
                    .map((log, index) => (
                        <div key={index} className="flex flex-col gap-4 p-6 rounded-xl col-span-1 bg-white shadow-md">
                            <p><span className="font-bold">Details:</span> {log.details}</p>
                            <p><span className="font-bold">User:</span> {log.user}</p>
                            <p><span className="font-bold">Time:</span> {new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
}

export default Logs;