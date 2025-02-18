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
        <div className='p-5 flex flex-col gap-3'>
            <Link to="/auth" className='w-fit p-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md'>dashboard</Link>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 capitalize">
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-gray-100">Team Name</th>
                            <th scope="col" className="px-6 py-3">Points</th>
                            <th scope="col" className="px-6 py-3 bg-gray-100">Wins</th>
                            <th scope="col" className="px-6 py-3">Losses</th>
                            <th scope="col" className="px-6 py-3 bg-gray-100">Draws</th>
                            <th scope="col" className="px-6 py-3">Group</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team) => (
                            <tr key={team.id} className="border-b border-gray-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-100 capitalize"
                                >
                                    {team.name}
                                </th>
                                <td className="px-6 py-4">{team.points}</td>
                                <td className="px-6 py-4 bg-gray-100">{team.wins}</td>
                                <td className="px-6 py-4">{team.losses}</td>
                                <td className="px-6 py-4 bg-gray-100">{team.draws}</td>
                                <td className="px-6 py-4">{team.group}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
