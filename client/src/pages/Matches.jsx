import { useEffect, useState, useMemo, useCallback } from "react"
import api from "../utils/api"
import { toast } from "sonner"
import { lineWobble, ping } from "ldrs"
import { Pause } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"

// Utility function for date formatting
const formatDate = (date) => {
    const today = new Date()
    const matchDate = new Date(date)
    const diffTime = matchDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    if (diffDays === -1) return "Yesterday"
    return matchDate.toLocaleString()
}

// Status configuration for consistent styling
const STATUS_CONFIG = {
    completed: { color: "green", icon: null },
    ongoing: { color: "red", icon: (props) => <l-ping size="24" speed="2" color="#fb2c36" {...props}></l-ping> },
    upcoming: { color: "gray", icon: null },
    break: { color: "orange", icon: (props) => <Pause size={20} className="text-orange-500" {...props} /> },
}

// Match card component
const MatchCard = ({ match }) => {
    const status = STATUS_CONFIG[match.status] || STATUS_CONFIG.upcoming

    return (
        <div
            className={`capitalize rounded-2xl border shadow-md border-${status.color}-500 p-4 transition-all duration-300 hover:shadow-lg`}
            aria-label={`Match between ${match.team1} and ${match.team2}, status: ${match.status}`}
        >
            <div className="flex justify-between items-center">
                <p className={`font-light text-${status.color}-500`}>{match.status}</p>
                {!["ongoing", "break"].includes(match.status) && (
                    <p className="text-gray-400 text-sm font-extralight">{formatDate(match.time)}</p>
                )}
                {status.icon && status.icon({ "aria-hidden": "true" })}
            </div>
            <div className="flex flex-col justify-between gap-5 mt-2">
                <div className="flex justify-between text-2xl font-light capitalize">
                    <p>{match.team1}</p>
                    <p className="text-center w-5 font-medium">{match.team1Score}</p>
                </div>
                <div className="flex justify-between text-2xl font-light capitalize">
                    <p>{match.team2}</p>
                    <p className="text-center w-5 font-medium">{match.team2Score}</p>
                </div>
            </div>
        </div>
    )
}

// Filter button component
const FilterButton = ({ status, activeFilter, onClick, count }) => (
    <button
        type="button"
        onClick={onClick}
        className={`w-fit px-4 py-2 capitalize text-sm transition-all transform duration-200 rounded-md 
      ${activeFilter === status
                ? "bg-gray-900 text-white font-semibold translate-y-0"
                : "bg-white shadow-md border border-gray-200 hover:bg-gray-800 hover:text-white cursor-pointer -translate-y-0.5"
            }`}
        aria-pressed={activeFilter === status}
    >
        {status} {count > 0 && <span className="ml-1 text-xs">{count}</span>}
    </button>
)

export default function Matches() {
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("all")

    // Fetch matches data
    useEffect(() => {
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

        fetchMatches()
    }, [])

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
    const filterOptions = ["all", "upcoming", "ongoing", "break", "completed"]

    return (
        <div className="flex flex-col min-h-screen justify-between w-full bg-white">
            <Header dark_text />

            <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5 w-full flex-grow min-h-screen">
                <h2 className="text-4xl font-bold mb-4 text-[#263741]">Matches</h2>

                {/* Filter buttons */}
                <div className="inline-flex gap-2 flex-wrap rounded-md" role="group" aria-label="Match filter options">
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

                {/* Loading state */}
                {loading && (
                    <div className="grid place-items-center py-10">
                        <l-line-wobble
                            size="80"
                            stroke="5"
                            bg-opacity="0.1"
                            speed="1.75"
                            color="black"
                            aria-label="Loading matches"
                        ></l-line-wobble>
                    </div>
                )}

                {/* Error state */}
                {error && !loading && (
                    <div className="text-center py-10">
                        <p className="text-red-500 mb-2">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredMatches.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No {filter !== "all" ? filter : ""} matches found</p>
                    </div>
                )}

                {/* Match list */}
                {!loading && !error && filteredMatches.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
