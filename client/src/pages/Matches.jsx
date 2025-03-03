import { useEffect, useState, useMemo, useCallback } from "react"
import api from "../utils/api"
import { toast } from "sonner"
import { lineWobble, ping } from "ldrs"
import { IoIosPause as Pause } from "react-icons/io"
import { GiSoccerField as Field } from "react-icons/gi"
import { IoRefreshOutline } from "react-icons/io5"
import { FiCalendar, FiClock } from "react-icons/fi"
import Header from "../components/Header"
import Footer from "../components/Footer"

// Utility function for date formatting
const formatDate = (date) => {
    const today = new Date()
    const matchDate = new Date(date)
    const diffTime = matchDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const options = { hour: "numeric", minute: "numeric", hour12: true }

    if (diffDays === 0) return `Today at ${matchDate.toLocaleTimeString([], options)}`
    if (diffDays === 1) return `Tomorrow at ${matchDate.toLocaleTimeString([], options)}`
    if (diffDays === -1) return `Yesterday at ${matchDate.toLocaleTimeString([], options)}`
    return matchDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
}

// Status configuration for consistent styling
const STATUS_CONFIG = {
    completed: {
        color: "border-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        badgeColor: "bg-green-100 text-green-800",
        icon: null,
    },
    live: {
        color: "border-red-500",
        bgColor: "bg-red-50",
        textColor: "text-red-700",
        badgeColor: "bg-red-100 text-red-800",
        icon: (props) => <l-ping size="24" speed="2" color="#ef4444" {...props}></l-ping>,
    },
    upcoming: {
        color: "border-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        badgeColor: "bg-blue-100 text-blue-800",
        icon: null,
    },
    break: {
        color: "border-orange-500",
        bgColor: "bg-orange-50",
        textColor: "text-orange-700",
        badgeColor: "bg-orange-100 text-orange-800",
        icon: (props) => <Pause size={20} className="text-orange-500" {...props} />,
    },
}

// Match card component
const MatchCard = ({ match }) => {
    const status = STATUS_CONFIG[match.status] || STATUS_CONFIG.upcoming

    return (
        <div
            className={`rounded-xl border-l-4 ${status.color} ${status.bgColor} shadow-sm p-5 transition-all duration-300 hover:shadow-md`}
            aria-label={`Match between ${match.team1} and ${match.team2}, status: ${match.status}`}
        >
            <div className="flex justify-between items-center mb-3">
                <div className={`px-4 py-2 rounded-full text-xs font-medium ${status.badgeColor} capitalize`}>
                    {match.status}
                </div>
                {status.icon && <div className="mr-2">{status.icon({ "aria-hidden": "true" })}</div>}

                {!["live", "break"].includes(match.status) && (
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{formatDate(match.time).split(" at ")[0]}</span>
                        <FiClock className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
                        <span>{formatDate(match.time).includes(" at ") ? formatDate(match.time).split(" at ")[1] : ""}</span>
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <p className="text-lg font-medium capitalize">{match.team1}</p>
                    </div>
                    <div className={`text-2xl font-bold ${match.status === "completed" ? "text-gray-900" : "text-gray-600"}`}>
                        {match.team1Score !== undefined ? match.team1Score : "-"}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">

                        <p className="text-lg font-medium capitalize">{match.team2}</p>
                    </div>
                    <div className={`text-2xl font-bold ${match.status === "completed" ? "text-gray-900" : "text-gray-600"}`}>
                        {match.team2Score !== undefined ? match.team2Score : "-"}
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
                <Field className="text-gray-500 size-5" aria-hidden="true" />
                <p className="capitalize text-sm text-gray-600">{match.venue || "Venue not specified"}</p>
            </div>
        </div>
    )
}

// Filter button component
const FilterButton = ({ status, activeFilter, onClick, count }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5
      ${activeFilter === status
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:border-gray-300"
            }`}
        aria-pressed={activeFilter === status}
    >
        <span className="capitalize">{status}</span>
        {count > 0 && (
            <span
                className={`inline-flex items-center justify-center w-5 h-5 text-xs rounded-full ${activeFilter === status ? "bg-white text-gray-900" : "bg-gray-100 text-gray-700"
                    }`}
            >
                {count}
            </span>
        )}
    </button>
)

export default function Matches() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("all")
    const [refreshing, setRefreshing] = useState(false)

    // Fetch matches data
    useEffect(() => {
        fetchMatches()
    }, [])

    async function fetchMatches() {
        lineWobble.register()
        ping.register()

        setLoading(true)
        try {
            const response = await api.getMatches()
            setMatches(response.sort((a, b) => new Date(b.time) - new Date(a.time)))
            setError(null)
        } catch (error) {
            console.error("Failed to fetch matches:", error)
            setError("Failed to load matches")
            toast.error("Failed to load matches: check your internet connection and try again")
        } finally {
            setLoading(false)
        }
    }

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true)
        try {
            const response = await api.getMatches()
            setMatches(response.sort((a, b) => new Date(b.time) - new Date(a.time)))
            setError(null)
            toast.success("Matches updated successfully")
        } catch (error) {
            console.error("Failed to refresh matches:", error)
            toast.error("Failed to refresh matches")
        } finally {
            setRefreshing(false)
        }
    }

    // Handle filter change
    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter)
    }, [])

    // Memoize filtered matches to prevent unnecessary re-renders
    const filteredMatches = useMemo(() => {
        if (filter === "all") return matches
        return matches.filter((match) => match.status === filter)
    }, [matches, filter])

    // Memoize status counts for filter buttons
    const statusCounts = useMemo(() => {
        const counts = { all: matches.length }
        matches.forEach((match) => {
            counts[match.status] = (counts[match.status] || 0) + 1
        })
        return counts
    }, [matches])

    // Filter options
    const filterOptions = ["all", "upcoming", "live", "break", "completed"]

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header dark_text />

            <main className="grow-1 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="rounded-xl py-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <h1 className="hidden">Matches</h1>
                        <p className="text-4xl text-gray-900">Matches</p>
                        <button
                            onClick={handleRefresh}
                            disabled={loading || refreshing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Refresh matches"
                        >
                            <IoRefreshOutline className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
                            <span>Refresh</span>
                        </button>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Match filter options">
                        {filterOptions.map((status) => (
                            <FilterButton
                                key={status}
                                status={status}
                                activeFilter={filter}
                                onClick={() => handleFilterChange(status)}
                                count={statusCounts[status] || 0}
                            />
                        ))}
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
                            color="black"
                            aria-label="Loading matches"
                        ></l-line-wobble>
                        <p className="mt-4 text-gray-500">Loading matches...</p>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                        <div className="text-red-500 mb-2 text-xl">{error}</div>
                        <p className="text-gray-500 mb-4">We couldn't load the matches. Please try again.</p>
                        <button
                            onClick={fetchMatches}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredMatches.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Field className="text-gray-400 size-8" aria-hidden="true" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No matches found</h3>
                        <p className="text-gray-500">
                            {filter !== "all"
                                ? `There are no ${filter} matches at the moment.`
                                : "There are no matches available right now."}
                        </p>
                    </div>
                )}

                {/* Match list */}
                {!loading && !error && filteredMatches.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {filteredMatches.map((match, index) => (
                            <MatchCard key={index} match={match} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
