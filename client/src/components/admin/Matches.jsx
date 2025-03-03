import { useEffect, useState } from "react"

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
  ; ``
import { toast } from "sonner"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import api from "../../utils/api"
import { useAuth } from "../../context/AuthContext"

import { IoMdClose as Close, IoIosPause as Pause } from "react-icons/io"
import { LuPlus as Plus } from "react-icons/lu"
import { IoCheckmarkDoneSharp as CheckCheck } from "react-icons/io5"
import { BsBroadcast as Cast } from "react-icons/bs"
import { MdOutlineDateRange as Calendar } from "react-icons/md"
import { GiSoccerBall as Ball, GiWhistle as Whistle } from "react-icons/gi"
import { FaPlay as Play } from "react-icons/fa"

import Loading from "./LoadingCard"

const Matches = () => {
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [match, setMatch] = useState({ team1Id: "", team2Id: "", venue: null, time: null })
  const [venueUpdate, setVenueUpdate] = useState({})
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [showCreateTeamForm, setShowCreateTeamForm] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      const teams = await api.getTeams()
      if (teams) setTeams(teams)
      await fetchMatches()
    }
    loadData()
  }, [])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const matches = await api.getMatches()
      setMatches(matches)
      return matches
    } catch (error) {
      console.error("Error fetching matches:", error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMatch = (e) => {
    e.preventDefault()
    if (!match.team1Id || !match.team2Id) return toast.error("Please select both teams.")
    if (match.team1Id === match.team2Id) return toast.error("Teams must be different.")
    if (!match.venue) return toast.error("Please select a venue.")
    if (!match.time) return toast.error("Please select a date and time.")

    try {
      toast.promise(api.createMatch(match, user.accessToken), {
        loading: "Creating match...",
        success: async () => {
          handleCloseForm()
          fetchMatches()
          return `Match created successfully: ${teams.find((t) => t.id === match.team1Id)?.name} vs ${teams.find((t) => t.id === match.team2Id)?.name} at ${new Date(match.time).toLocaleString()}`
        },
        error: (error) => `Failed: ${error.message}`,
      })
    } catch (error) {
      console.error("Error creating match:", error)
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOnChange = (event) => {
    setMatch((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }
  const handleVenueChange = (matchId, venue) => {
    setVenueUpdate((prev) => ({
      ...prev,
      [matchId]: venue,
    }))
  }
  const handleAction = async (action, matchId, venue, team1Id, team1Score, team2Score) => {
    const token = user.accessToken
    confirmAlert({
      title: "Confirm Action",
      message: `Are you sure you want to ${action} this match?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setLoading(true)
            toast.promise(
              async () => {
                if (action === "start") {
                  await api.startMatch(matchId, token)
                } else if (action === "end") {
                  await api.endMatch(matchId, team1Score, team2Score, token)
                } else if (action === "pause") {
                  await api.setBreakMatch(matchId, token)
                } else if (action === "score") {
                  await api.updateMatchScoreByTeamId(matchId, team1Id, token)
                } else if (action === "venue") {
                  await api.updateVenue(matchId, venue, token)
                } else if (action === "delete") {
                  await api.deleteMatch(matchId, token)
                } else {
                  throw new Error("Invalid action")
                }
                fetchMatches()
              },
              {
                loading: `${action}ing match...`,

                success: () => `Match ${action}ed successfully`,
                error: (error) => `Failed: ${error.message}`,
                finally: () => setLoading(false),
              },
            )
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    })
  }
  const handleCloseForm = () => {
    setShowCreateTeamForm(false)
    setMatch({ team1Id: "", team2Id: "", time: null })
  }

  return (
    <>
      {/* create match form */}
      <div
        className={`${showCreateTeamForm ? "flex" : "hidden"} fixed top-0 left-0 z-50 w-full h-full bg-black/90 backdrop-blur-sm flex items-center justify-center px-4`}
      >
        <form
          onSubmit={handleCreateMatch}
          className=" tracking-wider flex flex-col gap-3 max-w-[500px] py-8 px-2 b order border-gray-400 rounded-md w-full bg-neutral-100 shadow-2xl fade-in"
        >
          <div className="flex justify-between">
            <h2 className="text-5xl font-semibold">Create Match</h2>
            <button className="cursor-pointer" type="button" onClick={handleCloseForm}>
              <Close className="text-3xl" />
            </button>
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Select Team 1:</label>
            <select
              name="team1Id"
              value={match.team1Id}
              onChange={handleOnChange}
              className="p-2 border border-gray-400 rounded-md w-full h-11 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Select a team
              </option>
              {teams
                .filter((team) => team.id !== match.team2Id)
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
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
              <option value="" disabled>
                Select a team
              </option>
              {teams
                .filter((team) => team.id !== match.team1Id)
                .map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Select venue:</label>
            <select
              name="venue"
              value={match.venue || ""}
              onChange={handleOnChange}
              className="p-2 border border-gray-400 rounded-md w-full h-11 bg-white cursor-pointer"
            >
              <option value="" disabled>
                Select a venue
              </option>
              {["field 1", "field 2", "field 3", "field 4"].map((venue, index) => (
                <option key={index} value={venue}>
                  {venue}
                </option>
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
              className="p-2 border  border-gray-400 rounded-md  outline-none w-full h-11 bg-white cursor-pointer placeholder-black"
              placeholderText="Select date & time"
              onFocus={(e) => e.target.blur()}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer text-white rounded-md p-2 w-full transition-all transform flex justify-center items-center gap-2 border h-11 bg-indigo-500 border-indigo-500 shadow-md ${loading ? "animate-pulse cursor-progress bg-indigo-900 border-indigo-900" : "hover:bg-indigo-600 hover:border-indigo-600"} group`}
          >
            <Plus
              size={24}
              className={`transition-transform duration-300 text-2xl group-hover:rotate-90 ${loading && "animate-spin"}`}
            />
            <span>Create Match</span>
          </button>
        </form>
      </div>

      {/* matches  */}
      <div className="fade-in flex flex-col gap-3">
        <div className="inline-flex gap-2 flex-wrap rounded-md" role="group">
          {["all", "upcoming", "live", "break", "completed"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`w-28 px-4 py-2 capitalize text-sm  text-gray-900 transition-all transform duration-200 rounded-md -translate-0.5 ${filter === status
                ? "bg-gray-900 text-white font-semibold translate-0"
                : "bg-white shadow-md border border-gray-200  hover:bg-gray-800 hover:text-white cursor-pointer"
                }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={() => setShowCreateTeamForm(true)}
            disabled={showCreateTeamForm}
            className={`cursor-pointer w-fit text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-indigo-500 border-indigo-500 shadow-md ${loading ? "animate-pulse cursor-progress bg-indigo-900 border-indigo-900" : "hover:bg-indigo-600 hover:border-indigo-600"} group`}
          >
            <Plus
              size={24}
              className={`transition-transform duration-300 text-2xl group-hover:rotate-90 ${loading && "animate-spin"}`}
            />
            <span>Create Match</span>
          </button>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {loading ? (
              <Loading className="text-2xl" />
            ) : matches.filter((match) => filter === "all" || match.status === filter).length === 0 ? (
              <div className="col-span-1 md:col-span-2 p-6 text-center md:text-left text-xl font-semibold text-gray-500">
                {filter === "all"
                  ? "No matches found."
                  : filter !== "all"
                    ? `No ${filter} matches at the moment.`
                    : "No matches found."}
              </div>
            ) : (
              matches
                .filter((match) => filter === "all" || match.status === filter)
                .map((match) => (
                  <div key={match.id} className="flex flex-col gap-3 p-5 rounded-md shadow-md bg-white col-span-2.5">
                    <div className="flex justify-between items-center border-b border-gray-400 pb-2 px-2">
                      <div className="flex items-center gap-2">
                        {match.status === "completed" && <CheckCheck color="#388E3C" className="text-2xl" />}
                        {match.status === "live" && <Cast color="#ff4826" className="text-2xl" />}
                        {match.status === "break" && <Pause color="#f0b100" className="text-2xl" />}
                        {match.status === "upcoming" && <Calendar color="#9C27B0" className="text-2xl" />}
                        <span className="text-gray-600 capitalize">{match.status}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-4 p-3 rounded-lg">
                      <div className="flex-1 text-right">
                        <p className="text-2xl text-gray-800 capitalize">{match.team1 || "Team 1"}</p>
                        <div className={` items-center justify-between ${match.status === "live" && "flex"}`}>
                          {match.status === "live" && (
                            <button
                              onClick={() => handleAction("score", match.id, null, match.team1Id)}
                              className="border-b border-blue-300 text-blue-700 hover:text-blue-900 hover:border-blue-600 flex items-center gap-1 transition-all transform duration-300 cursor-pointer"
                            >
                              <Ball size={16} className="text-2xl" />
                              Score +1
                            </button>
                          )}
                          <p className="text-xl font-semibold text-gray-700">{match.team1Score ?? "N/A"}</p>
                        </div>
                      </div>

                      <div className=" text-lg font-semibold text-gray-500">VS</div>

                      <div className="flex-1 text-left">
                        <p className="text-2xl text-gray-800 capitalize">{match.team2 || "Team 2"}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-semibold text-gray-700">{match.team2Score ?? "N/A"}</p>
                          {match.status === "live" && (
                            <button
                              onClick={() => handleAction("score", match.id, null, match.team2Id)}
                              className="border-b border-blue-300 text-blue-700 hover:text-blue-900 hover:border-blue-600 flex items-center gap-1 transition-all transform duration-300 cursor-pointer"
                            >
                              <Ball size={16} className="text-2xl" />
                              Score +1
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 text-center mt-2">
                      <span className="font-bold">Time: </span>
                      {new Date(match.time).toLocaleString()}
                    </p>
                    <div className="flex flex-col gap-3 w-full">
                      <div className="flex items-center gap-2 justify-between border-t border-gray-200 pt-3">
                        <p className="text-gray-700">
                          <span className="font-bold">Venue: </span>
                          {match.venue || "Not set"}
                        </p>

                        {match.status === "upcoming" && (
                          <div className="flex items-center gap-2 grow-1">
                            <select
                              value={venueUpdate[match.id] || ""}
                              onChange={(e) => handleVenueChange(match.id, e.target.value)}
                              className="px-2 py-1.5 border border-gray-400 rounded-md bg-white cursor-pointer text-sm w-1/2"
                            >
                              <option value="" disabled>
                                Update venue
                              </option>
                              {["field 1", "field 2", "field 3", "field 4"].map((venue, index) => (
                                <option key={index} value={venue}>
                                  {venue}
                                </option>
                              ))}
                            </select>

                            {venueUpdate[match.id] && (
                              <button
                                onClick={() => {
                                  handleAction("venue", match.id, venueUpdate[match.id])
                                  setVenueUpdate((prev) => ({ ...prev, [match.id]: "" }))
                                }}
                                className="cursor-pointer text-white rounded-md px-4 py-1.5 text-sm transition-all transform flex justify-center items-center gap-1 bg-neutral-600 hover:bg-neutral-700"
                              >
                                Update
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 flex-wrap justify-center items-center">
                        {match.status === "upcoming" && (
                          <>
                            <button
                              onClick={() => handleAction("start", match.id)}
                              className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 shadow-md"
                            >
                              <Play size={24} className="text-2xl" />
                              <span>Start Match</span>
                            </button>
                            <button
                              onClick={() => handleAction("delete", match.id)}
                              className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-rose-500 border-rose-500 hover:bg-rose-600 hover:border-rose-600 shadow-md"
                            >
                              <Close className="text-2xl" />
                              <span>Delete Match</span>
                            </button>
                          </>
                        )}
                        {match.status === "live" && (
                          <>
                            <button
                              onClick={() =>
                                handleAction("end", match.id, null, match.team1Id, match.team1Score, match.team2Score)
                              }
                              className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-emerald-500 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 shadow-md"
                            >
                              <Whistle size={24} className="text-2xl" />
                              <span>End Match</span>
                            </button>
                            <button
                              onClick={() => handleAction("pause", match.id)}
                              className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-amber-500 border-amber-500 hover:bg-amber-600 hover:border-amber-600 shadow-md"
                            >
                              <Pause size={24} className="text-2xl" />
                              <span>Set Match to Break</span>
                            </button>
                          </>
                        )}
                        {match.status === "break" && (
                          <button
                            onClick={() => handleAction("start", match.id)}
                            className="cursor-pointer text-white rounded-md p-2 transition-all transform flex justify-center items-center gap-2 border h-11 bg-indigo-500 border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 shadow-md"
                          >
                            <CheckCheck size={24} className="text-2xl" />
                            <span>Continue Match</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Matches
