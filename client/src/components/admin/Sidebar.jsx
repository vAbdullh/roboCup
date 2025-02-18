import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/setup";
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Home, LogOut, Wrench } from 'lucide-react';
import { Users } from 'lucide-react';
import { MonitorCog, Gamepad } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export default function Sidebar({ selected, setSelected }) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <aside className='fixed p-3.5 text-white xl:h-screen w-screen xl:w-fit'>
            <div className='xl:bg-[#263741] xl:p-3 rounded-md flex xl:flex-col justify-between items-center w-full xl:h-full xl:w-64'>
                <LargeScreen handleLogout={handleLogout} user={user} selected={selected} setSelected={setSelected} />
                <SmallScreen handleLogout={handleLogout} user={user} selected={selected} setSelected={setSelected} />
            </div>
        </aside>
    )
}
const LargeScreen = ({ handleLogout, user, selected, setSelected }) => {

    return (
        <>
            <h1 className='font-bold text-xl font-sans xl:mb-5 text-center hidden xl:flex gap-2 items-center capitalize'><Wrench />Admin dashboard</h1>
            <nav className='hidden xl:block grow min-w-full'>
                <ul className="flex flex-col gap-2 items-start h-full">
                    <li onClick={() => setSelected('Teams')} className={`flex items-center gap-2 w-full p-2  transition-all transform duration-300  rounded-md cursor-pointer ${selected === 'Teams' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}><Users />Teams</li>
                    <li onClick={() => setSelected('Matches')} className={`flex items-center gap-2 w-full p-2  transition-all transform duration-300  rounded-md cursor-pointer ${selected === 'Matches' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}> <Gamepad />Matches</li>
                    <li onClick={() => setSelected('Logs')} className={`flex items-center gap-2 w-full p-2  transition-all transform duration-300 rounded-md cursor-pointer ${selected === 'Logs' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}><MonitorCog />Logs</li>
                </ul>
            </nav>

            <div className='hidden xl:flex flex-col gap-2'>
                <div className='flex items-center gap-2 my-2'>
                    <div className='bg-neutral-800 grid place-items-center p-3 rounded-full h-11 aspect-square'>
                        <Bot color={'#eee'} className='size-full' />
                    </div>
                    <p >
                        {user?.displayName ? (
                            <>
                                <span className="font-bold">{user.displayName}</span> <span className="text-gray-400 block max-w-44 overflow-hidden truncate" title={user.email}>{user.email}</span>
                            </>
                        ) : (
                            <span className="font-bold max-w-56 overflow-hidden">{user.email}</span>
                        )}
                    </p>
                </div>
                <div className='flex'>
                    <button onClick={handleLogout} type="button" className="grow flex items-center text-white transition-all transform duration-300 justify-center gap-1 text-center rounded-l-md bg-[#D32F2F] px-3 py-2 cursor-pointer hover:bg-[#D32F2Fb4]">
                        Logout
                        <LogOut color={'#fff'} size={16} />

                    </button>
                    <Link to='/'>
                        <button className='bg-blue-700 hover:bg-blue-900 transition-all transform rounded-r-md p-2'><Home /></button>
                    </Link>
                </div>
            </div >
        </>)
}

const SmallScreen = ({ handleLogout, user, selected, setSelected }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSelect = (selected) => {
        setSelected(selected);
        setIsOpen(false);
    }

    return (
        <div className='xl:hidden w-full'>
            <div className={`flex flex-col justify-between items-center px-5 relative min-h-12 min-w-full bg-[#263741] rounded-md ${isOpen ? ' h-full' : 'h-12'} transition-all duration-300 ease-in-out`}>
                <div className='flex justify-between items-center w-full h-12'>
                    <h1 className='font-bold capitalize text-xl xl:mb-5 text-center'>Admin dashboard</h1>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`grid place-items-center cursor-pointer py-2 transition-all transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                        <ChevronDown />
                    </button>
                </div>
                <div className={`grow-1 w-full z-30  top-14 left-0 transition-all transform ${isOpen ? 'max-h-96 py-5 duration-500' : 'max-h-0 duration-500'}`}>
                    <nav
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                    >
                        <ul className="flex flex-col gap-2 items-start h-full">
                            <li
                                onClick={() => handleSelect('Teams')}
                                className={`flex gap-2 w-full p-2 transition-all transform duration-300 rounded-md cursor-pointer ${selected === 'Teams' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}
                            >
                                <Users size={20} />
                                <span>Teams</span>
                            </li>
                            <li
                                onClick={() => handleSelect('Matches')}
                                className={`flex gap-2 w-full p-2 transition-all transform duration-300 rounded-md cursor-pointer ${selected === 'Matches' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}
                            >
                                <Gamepad size={20} />
                                <span>Matches</span>
                            </li>
                            <li
                                onClick={() => handleSelect('Logs')}
                                className={`flex gap-2 w-full p-2 transition-all transform duration-300 rounded-md cursor-pointer ${selected === 'Logs' ? 'bg-[#151f27]' : 'hover:bg-[#1c2a35]'}`}
                            >
                                <MonitorCog size={20} />
                                <span>Logs</span>
                            </li>
                        </ul>
                    </nav>
                    <div
                        className={`flex overflow-hidden justify-between items-center transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 border-t mt-2 border-[#222]' : 'max-h-0'}`}
                    >
                        <div className='flex items-center justify-center gap-2 my-2'>
                            <div className=' bg-neutral-800 grid place-items-center p1 rounded-full h-10 aspect-square relative'>
                                <Bot color='#fff' />
                            </div>
                            <p>
                                {user?.displayName ? (
                                    <>
                                        <span className="font-bold">{user.displayName}</span> <span className="text-gray-400 block">{user.email}</span>
                                    </>
                                ) : (
                                    <span className="font-bold">{user.email}</span>
                                )}
                            </p>
                        </div>
                        <div className='flex items-center'>
                            <button onClick={handleLogout} type="button" className="grow flex items-center text-white transition-all transform duration-300 justify-center gap-1 text-center rounded-l-md bg-[#D32F2F] px-2 py-2 cursor-pointer hover:bg-[#D32F2Fb4]">
                                <LogOut color={'#fff'} />
                            </button>
                            <Link to='/'>
                                <button className='bg-blue-700 hover:bg-blue-900 transition-all transform rounded-r-md p-2'><Home /></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
