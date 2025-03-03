"use client"

import { useEffect, useState, useCallback } from "react"
import api from "../utils/api"
import { toast } from "sonner"
import { lineWobble } from "ldrs"
import { IoTrophyOutline } from "react-icons/io5"
import { FaMedal } from "react-icons/fa"
import Header from "../components/Header"
import Footer from "../components/Footer"

// Medal components for top 3 teams
const TopRankBadge = ({ rank }) => {
    if (rank === 1) {
        return (
            <div className="flex items-center justify-center w-7 h-7 bg-yellow-100 text-yellow-800 rounded-full">
                <FaMedal className="text-yellow-500" />
            </div>
        )
    } else if (rank === 2) {
        return (
            <div className="flex items-center justify-center w-7 h-7 bg-gray-100 text-gray-800 rounded-full">
                <FaMedal className="text-gray-400" />
            </div>
        )
    } else if (rank === 3) {
        return (
            <div className="flex items-center justify-center w-7 h-7 bg-orange-100 text-orange-800 rounded-full">
                <FaMedal className="text-orange-600" />
            </div>
        )
    }

    return <div className="text-gray-500 font-medium text-center w-7">{rank}</div>
}

export default function Leaderboard() {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchTeams = useCallback(async () => {
        setLoading(true)
        try {
            const data = await api.getTeams()
            setTeams(data)
            setError(null)
        } catch (error) {
            console.error(error)
            setError("Failed to load leaderboard")
            toast.error("Failed to load leaderboard: check your internet connection and try again")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        lineWobble.register()
        fetchTeams()
    }, [fetchTeams])

    // Sort teams by points (highest first)
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header dark_text />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
                <div className="rounded-xl mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <IoTrophyOutline className="h-8 w-8 text-yellow-500" aria-hidden="true" />
                            <h1 className="hidden">Leaderboard</h1>
                            <p className="text-4xl font-bold text-gray-900">Leaderboard</p>
                        </div>
                    </div>
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                        <l-line-wobble
                            size="80"
                            stroke="5"
                            bg-opacity="0.1"
                            speed="1.75"
                            color="#263741"
                            aria-label="Loading leaderboard"
                        ></l-line-wobble>
                        <p className="mt-4 text-gray-500">Loading leaderboard...</p>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-16 px-3 text-center bg-white rounded-xl shadow-sm">
                        <div className="text-red-500 mb-2 text-xl">{error}</div>
                        <p className="text-gray-500 mb-4">We couldn't load the leaderboard. Please try again.</p>
                        <button
                            onClick={fetchTeams}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && teams.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <IoTrophyOutline className="text-gray-400 size-8" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No teams found</h3>
                        <p className="text-gray-500">There are no teams in the leaderboard yet.</p>
                    </div>
                )}

                {/* Leaderboard table */}
                {!loading && !error && teams.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="w-full overflow-x-auto overscroll-none">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-50 border-b text-xs uppercase tracking-wider">
                                        <th scope="col" className="px-6 py-4 text-center w-16 sticky left-0 bg-gray-50 z-10">
                                            Rank
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-4 text-left sticky left-16 bg-gray-50 z-10 font-semibold text-gray-700"
                                        >
                                            Team
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center font-semibold text-green-600">
                                            Wins
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center font-semibold text-red-600">
                                            Losses
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center font-semibold text-orange-500">
                                            Draws
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center font-semibold text-blue-600">
                                            Points
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedTeams.map((team, index) => {
                                        const isTopThree = index < 3

                                        return (
                                            <tr
                                                key={team.id}
                                                className={`font-light border-b border-gray-200 transition-colors ${isTopThree ? "bg-yellow-50" : index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    }`}
                                            >
                                                <td className="px-6 py-4 text-center sticky left-0 z-10 bg-inherit">
                                                    <div className="flex justify-center">
                                                        <TopRankBadge rank={index + 1} />
                                                    </div>
                                                </td>
                                                <th className="px-6 py-4 text-gray-900 whitespace-nowrap capitalize sticky left-16 z-10 bg-inherit">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isTopThree ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                                }`}
                                                        >
                                                            {team.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium">{team.name}</span>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-10 p-2 aspect-square rounded-full bg-green-50 text-green-700">
                                                        {team.wins}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-10 p-2 aspect-square rounded-full bg-red-50 text-red-700">
                                                        {team.losses}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-10 p-2 aspect-square rounded-full bg-orange-50 text-orange-700">
                                                        {team.draws}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-10 p-2 aspect-square rounded-full bg-blue-50 text-blue-700">
                                                        {team.points}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
