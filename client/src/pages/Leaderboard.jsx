"use client"

import { useEffect, useState, useCallback } from "react"
import api from "../utils/api"
import { toast } from "sonner"
import { lineWobble } from "ldrs"
import { IoTrophyOutline } from "react-icons/io5"
import { FaMedal } from "react-icons/fa"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { BiSolidTimer } from "react-icons/bi";
import { Link } from "react-router-dom"

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
        // fetchTeams()
    }, [fetchTeams])

    // Sort teams by points (highest first)
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header dark_text />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[85vh]">
                <div className="rounded-xl mb-6">
                    <h1 className="hidden">Leaderboard</h1>
                    <p className="text-4xl font-bold text-gray-900">Leaderboard</p>
                </div>
                <div className="text-gray-500 rounded-md shadow-md bg-white text-center py-10 flex flex-col gap-2 justify-center items-center" data-aos="fade-up" data-aos-duration="500">
                    <BiSolidTimer className="size-20" />
                    <p className="text-lg">RoboCup 2025 is coming!</p>
                    <p className="text-lg">Save the date: May 6-8, 2025!</p>
                    <Link to="/" className="border-b text-blue-500 hover:underline">Go back to Home</Link>
                </div>
            </main>

            <Footer />
        </div>
    )
}
