import { AppleIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api';

export default function Home() {
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        async function getTeams() {
            setTeams(await api.getTeams());
        }
        getTeams();
    }, [])

    return (
        <div className='p-5 flex flex-col gap-3 relative bg-opacity-70'>

            {/* Dashboard Button */}
            <Link to="/admin" className='w-fit p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md'>
                Dashboard
            </Link>

            {/* Teams Table */}
            <div className="w-full overflow-x-auto md:px-5">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 capitalize">
                        <tr className='bg-gray-50 border-b'>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4 ">Team Name</th>
                            <th scope="col" className="px-6 py-4">Points</th>
                            <th scope="col" className="px-6 py-4 ">Wins</th>
                            <th scope="col" className="px-6 py-4">Losses</th>
                            <th scope="col" className="px-6 py-4 ">Draws</th>
                            <th scope="col" className="px-6 py-4">Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams
                            .sort((a, b) => b.points - a.points)
                            .map((team, index) => (
                                <tr key={team.id} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} fade-in`}>
                                    <td className='px-6 py-4'>{index + 1}</td>
                                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">
                                        {team.name}
                                    </th>
                                    <td className="px-6 py-4">{team.points}</td>
                                    <td className="px-6 py-4">{team.wins}</td>
                                    <td className="px-6 py-4">{team.losses}</td>
                                    <td className="px-6 py-4">{team.draws}</td>
                                    <td className="px-6 py-4">{team.group}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
