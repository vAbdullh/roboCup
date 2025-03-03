import React, { useEffect, useState } from 'react'
import api from '../utils/api';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { lineWobble } from 'ldrs'

export default function Home() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        lineWobble.register()

        async function getTeams() {
            try {
                setTeams(await api.getTeams());
            } catch (error) {
                console.error(error);
                toast.error(`Failed to load leaderboard: check your internet connection and try again`);
            }
            finally {
                setLoading(false);
            }
        }
        getTeams();
    }, [])

    return (
        <div className='flex flex-col min-h-screen justify-between w-full bg-white'>
            <Header dark_text />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-5 w-full min-h-screen">
                <h2 className="text-4xl font-bold mb-4 text-[#263741]">Leaderboard</h2>
                {loading ? (
                    <div className="grid place-items-center p-10">
                        <l-line-wobble
                            size="80"
                            stroke="5"
                            bg-opacity="0.1"
                            speed="1.75"
                            color="#263741"
                        ></l-line-wobble>
                    </div>
                )
                    :
                    <div className="w-full overflow-x-auto overscroll-none md:px-5">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 capitalize">
                                <tr className='bg-gray-50 border-b font-light text-center'>
                                    <th scope="col" className="px-6 py-4 text-left w-5 sticky left-0 bg-gray-50 z-10">#</th>
                                    <th scope="col" className="px-6 py-4 text-left sticky left-12 bg-gray-50 z-10">Team Name</th>
                                    <th scope="col" className="px-6 py-4 text-green-500 ">Wins</th>
                                    <th scope="col" className="px-6 py-4 text-red-500">Losses</th>
                                    <th scope="col" className="px-6 py-4 text-orange-500">Draws</th>
                                    <th scope="col" className="px-6 py-4">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams
                                    .sort((a, b) => b.points - a.points)
                                    .map((team, index) => (
                                        <tr key={team.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className='px-6 py-4 font-light sticky left-0 bg-white'>{index + 1}</td>
                                            <th className="px-6 py-4 font-light text-gray-900 whitespace-nowrap capitalize sticky left-12">
                                                {team.name}
                                            </th>
                                            <td className="px-6 py-4 font-light text-center">{team.wins}</td>
                                            <td className="px-6 py-4 font-light text-center">{team.losses}</td>
                                            <td className="px-6 py-4 font-light text-center">{team.draws}</td>
                                            <td className="px-6 py-4 font-light text-center">{team.points}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <Footer />
        </div>
    )
}
