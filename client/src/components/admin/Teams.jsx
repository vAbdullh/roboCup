import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";
import { Shield, Plus, X, Pencil } from "lucide-react";

import { toast } from "sonner";
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from "./LoadingCard";

const Teams = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState([]);
    const [editingTeam, setEditingTeam] = useState('');
    const [newGroup, setNewGroup] = useState('');

    const handleOnChange = (e) => {
        setTeam({ ...team, [e.name]: e.value });
    }
    const handleNewGroup = (value) => {
        setNewGroup(value);
    }
    useEffect(() => {
        handleGetTeams();
    }, [user.accessToken]);

    const handleGetTeams = async () => {
        setLoading(true);
        try {
            const data = await api.getTeams();
            setTeams(data);
        } catch (error) {
            console.error("Error Loading teams:", error);
            toast.error(`Error Loading teams:: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateTeam = (e) => {
        e.preventDefault();

        if (!team.name || !team.group) {
            toast.error("Please provide team name and group.");
            return;
        }

        setLoading(true);
        try {
            toast.promise(api.createTeam(team, user.accessToken), {
                loading: "Creating team...",
                success: (message) => {
                    handleGetTeams();
                    return `Team created successfully!`;
                },
                error: (error) => `Failed: ${error.message}`,
            });
        } catch (error) {
            console.error("Error creating team:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleSetNewGroup = (teamId, newGroup) => {
        confirmAlert({
            title: "Confirm update",
            message: "Are you sure you want to update?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {
                            toast.promise(api.setGroup(teamId, newGroup, user.accessToken), {
                                loading: "Setting group...",
                                success: (message) => {
                                    handleGetTeams();
                                    setEditingTeam('');
                                    return `Group set successfully!`;
                                },
                                error: (error) => `Failed: ${error.message}`,
                            });
                        } catch (error) {
                            console.error("Error setting group:", error);
                            toast.error(error.message);
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    label: "No",
                    onClick: () => console.log("Cancelled!")
                }
            ]
        });
    }
    const handleDeleteTeam = (teamId) => {
        confirmAlert({
            title: "Confirm Deletion",
            message: "Are you sure you want to delete this?",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        try {
                            toast.promise(api.deleteTeam(teamId, user.accessToken), {
                                loading: "Deleting team...",
                                success: (message) => {
                                    handleGetTeams();
                                    return `Team deleted successfully!`;
                                },
                                error: (error) => `Failed: ${error.message}`,
                            });
                        } catch (error) {
                            console.error("Error deleting team:", error);
                            toast.error(error.message);
                        } finally {
                            setLoading(false);
                        }
                    }
                },
                {
                    label: "No",
                    onClick: () => console.log("Cancelled!")
                }
            ]
        });

    }
    return (
        <div className="fade-in flex flex-col gap-3">
            <h4 className="text-gray-400">Create team</h4>
            <form onSubmit={handleCreateTeam} className="flex flex-row items-center w-fit h-fit ">

                <input name="name" id="name" type="text"
                    onChange={(e) => handleOnChange(e.target)}
                    placeholder="Team name" className="p-2.5 w-full md:w-96 text-lg text-gray-900 bg-white rounded-l-md h-11 outline-none shadow-md " />
                <select
                    name="group"
                    onChange={(e) => handleOnChange(e.target)}
                    className="p-2 border-l border-gray-400/30 outline-none h-11 bg-white shadow-md"
                >
                    <option value="">Group</option>
                    {Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                        <option key={letter} value={letter}>{letter}</option>
                    ))}
                </select>
                <button type="submit" disabled={loading} className={` shadow-md cursor-pointer text-white rounded-r-md p-2 w-fit transition-all transform flex justify-center items-center gap-2 border h-11 ${loading ? 'animate-pulse cursor-progress bg-[#1da14d] border-[#1da14d]' : 'bg-[#4CAF50] border-[#4CAF50] hover:bg-[#4CAF50B4] hover:border-[#4CAF50B4]'} group`}><Plus size={24} className={`transition-transform duration-300 group-hover:rotate-90 ${loading && "animate-spin"}`} />
                    <span className="hidden xl:inline">Create Team</span>
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                <p className="text-3xl capitalize font-semibold md:col-span-2 xl:col-span-3">teams</p>
                {teams.length <= 0 && loading ?
                    <Loading />
                    : teams.length <= 0 && !loading ? (
                        <div className="p-6 text-center md:text-left text-xl font-semibold text-gray-500">No teams found</div>
                    ) : (
                        teams.map((team, index) => (
                            <div key={index} className="flex flex-col gap-4 p-6 rounded-xl col-span-1 bg-white shadow-xl">
                                <div className="flex gap-2 items-end capitalize">
                                    <Shield />
                                    <h3 className="text-2xl font-semibold">{team.name}</h3>
                                </div>
                                <p ><span className="font-bold">Group:</span> {team.group}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    <p ><span className="font-bold">Wins:</span> {team.wins}</p>
                                    <p ><span className="font-bold">Losses:</span> {team.losses}</p>
                                    <p ><span className="font-bold">Draws:</span> {team.draws}</p>
                                    <p ><span className="font-bold">Points:</span> {team.points}</p>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {editingTeam === index ?

                                        <>
                                            <select
                                                name="newGroup"
                                                value={newGroup}
                                                onChange={(e) => handleNewGroup(e.target.value)}
                                                className="p-2 border rounded-md"
                                            >
                                                <option value="">Select Group</option>
                                                {Array.from({ length: 6 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                                                    <option key={letter} value={letter}>{letter}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => handleSetNewGroup(team.id, newGroup)}
                                                disabled={loading}
                                                className={`flex gap-2 items-center p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 cursor-pointer ${loading && 'cursor-not-allowed animate-pulse'}`}>Confirm</button>
                                        </>
                                        : <button
                                            onClick={() => setEditingTeam(index)}
                                            disabled={loading}
                                            className={`flex gap-2 items-center p-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200 cursor-pointer ${loading && 'cursor-not-allowed animate-pulse'}`}>
                                            <Pencil size={16} /> Edit Group
                                        </button>
                                    }

                                    <button
                                        onClick={() => handleDeleteTeam(team.id)}
                                        disabled={loading}
                                        className={`flex gap-2 items-center p-3 rounded-lg bg-[#D32F2F] hover:bg-[#D32F2Fb4] text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 cursor-pointer ${loading && 'cursor-not-allowed animate-pulse'}`}>
                                        <X size={16} /> Delete
                                    </button>
                                </div>
                            </div>

                        ))
                    )}
            </div>
        </div >
    );
}

export default Teams;