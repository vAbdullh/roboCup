import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
``
import { toast } from "sonner";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import { X, Plus, CheckCheck, Cast, CalendarDays, Volleyball } from "lucide-react";
import Loading from "./LoadingCard";

const Matches = () => {
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("all");
    const [match, setMatch] = useState({ team1Id: "", team2Id: "", time: null });
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState([]);
    const [showCreateTeamForm, setShowCreateTeamForm] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        const loadData = async () => {
            console.log(user.accessToken)
            const teams = await api.getTeams();
            if (teams) setTeams(teams);
            await fetchMatches()

        };
        loadData();
    }, []);

    const fetchMatches = async () => {
        setLoading(true);
        try {
            const matches = await api.getMatches();
            setMatches(matches);
            return matches;
        } catch (error) {
            console.error("Error fetching matches:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateMatch = (e) => {
        e.preventDefault();
        if (!match.team1Id || !match.team2Id) return toast.error("Please select both teams.");
        if (match.team1Id === match.team2Id) return toast.error("Teams must be different.");
        if (!match.time) return toast.error("Please select a date and time.");

        try {
            toast.promise(api.createMatch(match, user.accessToken), {
                loading: "Creating match...",
                success: async () => {
                    fetchMatches()
                    return `Match created successfully: ${teams.find(t => t.id === match.team1Id)?.name} vs ${teams.find(t => t.id === match.team2Id)?.name} at ${new Date(match.time).toLocaleString()}`;
                },
                error: (error) => `Failed: ${error.message}`,
            });
        } catch (error) {
            console.error("Error creating match:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
            handleCloseForm();
        }

    };

    const handleOnChange = (event) => {
        setMatch((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    const handleAction = async (action, matchId, team1Id, team1Score, team2Score) => {
        console.log(`parms: ${action} ${matchId} ${team1Id} ${team1Score} ${team2Score}`);
        
        const token = user.accessToken;
        confirmAlert({
            title: 'Confirm Action',
            message: `Are you sure you want to ${action} this match?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setLoading(true);
                        toast.promise(async () => {
                            if (action === "start") {
                                await api.startMatch(matchId, token);
                            } else if (action === "end") {
                                await api.endMatch(matchId, team1Score, team2Score, token);
                            }
                            else if (action === "pause") {
                                await api.setBreakMatch(matchId, token);
                            }
                            else if (action === "score") {
                                console.log("updating score", matchId);
                                await api.updateMatchScoreByTeamId(matchId, team1Id, token);
                            }
                            else if (action === "delete") {
                                await api.deleteMatch(matchId, token);
                            } else {
                                throw new Error("Invalid action");
                            } fetchMatches();
                        }, {
                            loading: `${action}ing match...`,

                            success: () => `Match ${action}ed successfully`,
                            error: (error) => `Failed: ${error.message}`,
                            finally: () => setLoading(false)

                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }
    const handleCloseForm = () => {
        setShowCreateTeamForm(false);
        setMatch({ team1Id: "", team2Id: "", time: null });
    }

    return (
        <>
            {/* create match form */}
            <div className={`${showCreateTeamForm ? 'flex' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full backdrop-blur-sm flex items-center justify-center px-4 fade-in`}>
                <form onSubmit={handleCreateMatch} className="flex flex-col gap-3 max-w-[500px] p-2 b order border-gray-400 rounded-md w-full bg-white shadow-2xl">
                    <div className="flex justify-between">
                        <h2 className="text-7xl font-semibold">Create Match</h2>
                        <button className="cursor-pointer" type="button" onClick={handleCloseForm}><X /></button>
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Select Team 1:</label>
                        <select
                            name="team1Id"
                            value={match.team1Id}
                            onChange={handleOnChange}
                            className="p-2 border border-gray-400 rounded-md w-full h-11 bg-white cursor-pointer"
                        >
                            <option value="" disabled>Select a team</option>
                            {teams
                                .filter(team => team.id !== match.team2Id)
                                .map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Select Team 2:</label>
                        <select
                            name="team2Id"
                            value={match.team2Id}
                            onChange={handleOnChange}
                            className="p-2 border border-gray-400 rounded-md w-full h-11 bg-white cursor-pointer"
                        >
                            <option value="" disabled>Select a team</option>
                            {teams
                                .filter(team => team.id !== match.team1Id)
                                .map((team) => (
                                    <option key={team.id} value={team.id}>{team.name}</option>
                                ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-gray-700 font-medium">Select Date & Time:</label>
                        <DatePicker
                            selected={match.time}
                            onChange={(date) => setMatch((prev) => ({ ...prev, time: date }))}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className="p-2 border  border-gray-400 rounded-md  outline-none w-full h-11 bg-white cursor-pointer"
                            placeholderText="Select date & time"
                            onFocus={(e) => e.target.blur()}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`cursor-pointer text-white rounded-md p-2 w-full transition-all transform flex justify-center items-center gap-2 border h-11 bg-blue-500 border-blue-500 ${loading ? "animate-pulse cursor-progress bg-blue-900 border-blue-900" : "hover:bg-blue-600 hover:border-blue-600"
                            } group`}
                    >
                        <Plus size={24} className={`transition-transform duration-300 group-hover:rotate-90 ${loading && "animate-spin"}`} />
                        <span>Create Match</span>
                    </button>
                </form>
            </div>
            <div className="fade-in flex flex-col gap-3">

                <div className="inline-flex gap-2 flex-wrap rounded-md" role="group">
                    {["all", "upcoming", "ongoing", "break", "completed"].map((status) => (
                        <button
                            key={status}
                            type="button"
                            onClick={() => setFilter(status)}
                            className={`w-28 px-4 py-2 capitalize text-sm  text-gray-900 transition-all transform duration-200 rounded-md -translate-0.5 ${filter === status ? "bg-gray-900 text-white font-semibold translate-0" : "bg-white shadow-md border border-gray-200  hover:bg-gray-800 hover:text-white cursor-pointer"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                    <button
                        onClick={() => setShowCreateTeamForm(true)} disabled={showCreateTeamForm}
                        className={`cursor-pointer w-fit text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-green-500 border-green-500 ${loading ? "animate-pulse cursor-progress bg-green-900 border-green-900" : "hover:bg-green-600 hover:border-green-600"
                            } group`}
                    >
                        <Plus size={24} className={`transition-transform duration-300 group-hover:rotate-90 ${loading && "animate-spin"}`} />
                        <span>Create Match</span>
                    </button>
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                        {loading ? <Loading /> : (matches.filter((match) => filter === "all" || match.status === filter).length === 0 ? (
                            <div className="col-span-1 md:col-span-2 p-6 text-center md:text-left text-xl font-semibold text-gray-500">
                                {filter === "all"
                                    ? "No matches found."
                                    : filter !== "all"
                                        ? `No ${filter} matches at the moment.` : "No matches found."
                                }
                            </div>
                        ) : (
                            matches
                                .filter((match) => filter === "all" || match.status === filter)
                                .map((match) => (
                                    <div
                                        key={match.id}
                                        className="flex flex-col gap-3 p-5 rounded-md shadow-md bg-white col-span-2.5"
                                    >
                                        <div className="flex justify-between items-center border-b border-gray-400 pb-2 px-2">
                                            <div className="flex items-center gap-2">
                                                {match.status === "completed" && <CheckCheck color="#388E3C" />}
                                                {match.status === "ongoing" && <Cast color="#ff4826" />}
                                                {match.status === "break" && <Cast color="#0000ff" />}
                                                {match.status === "upcoming" && <CalendarDays color="#9C27B0" />}
                                                <span className="text-gray-600 capitalize">{match.status}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center gap-4 p-3 rounded-lg">
                                            <div className="flex-1 text-right">
                                                <h3 className="text-lg font-bold text-gray-800 capitalize">{match.team1 || "Team 1"}</h3>
                                                <div className={` items-center justify-between ${match.status === "ongoing" && "flex"}`}>
                                                    {match.status === "ongoing" && (
                                                        <button
                                                            onClick={() => handleAction("score", match.id, match.team1Id)}
                                                            className="border-b border-blue-300 text-blue-300 hover:text-blue-600 hover:border-blue-600 flex items-center gap-1 transition-all transform duration-300 cursor-pointer">
                                                            <Volleyball size={16} />Score +1</button>
                                                    )}
                                                    <p className="text-xl font-semibold text-gray-700">{match.team1Score ?? "N/A"}</p>
                                                </div>
                                            </div>

                                            <div className=" text-lg font-semibold text-gray-500">VS</div>

                                            <div className="flex-1 text-left">
                                                <h3 className="text-lg font-bold text-gray-800 capitalize">{match.team2 || "Team 2"}</h3>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xl font-semibold text-gray-700">{match.team2Score ?? "N/A"}</p>
                                                    {match.status === "ongoing" && (
                                                        <button
                                                            onClick={() => handleAction("score", match.id, match.team2Id)}
                                                            className="border-b border-blue-300 text-blue-300 hover:text-blue-600 hover:border-blue-600 flex items-center gap-1 transition-all transform duration-300 cursor-pointer">
                                                            <Volleyball size={16} />Score +1</button>
                                                    )}

                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-700 text-center mt-2">
                                            <span className="font-bold">Time: </span>{new Date(match.time).toLocaleString()}</p>
                                        <div className="flex gap-2 flex-wrap justify-center items-center" >
                                            {match.status === "upcoming" && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction("start", match.id)}
                                                        className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600"
                                                    >
                                                        <CheckCheck size={24} />
                                                        <span>Start Match</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction("delete", match.id)}
                                                        className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                                                    >
                                                        <X size={24} />
                                                        <span>Delete Match</span>
                                                    </button>
                                                </>
                                            )}
                                            {match.status === "ongoing" && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction("end", match.id, match.team1Id, match.team1Score, match.team2Score)}
                                                        className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600"
                                                    >
                                                        <CheckCheck size={24} />
                                                        <span>End Match</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction("pause", match.id)}
                                                        className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600"
                                                    >
                                                        <CheckCheck size={24} />
                                                        <span>Set Match to Break</span>
                                                    </button>
                                                </>
                                            )}
                                            {match.status === "break" && (
                                                <button
                                                    onClick={() => handleAction("start", match.id)}
                                                    className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600"
                                                >
                                                    <CheckCheck size={24} />
                                                    <span>Continue Match</span>
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                ))
                        ))}
                    </div>

                </div>
            </div >
        </>
    );
};

export default Matches;