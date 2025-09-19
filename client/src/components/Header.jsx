import React, { useState } from 'react';
import {
    CgClose as X,
    CgMenuLeft as Menu
} from "react-icons/cg";
import logo from '../assets/logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ dark_text }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={`bg-transparent ${dark_text ? 'text-[#263741]' : 'text-white'}  h-[72px]`}>
            <div className={`absolute top-7 left-0 flex justify-between items-center w-full py-px  px-7 xl:px-10`}>
                <Link to={'/'} className='text-2xl font-bold'>
                    <img src={logo} alt="RoboCup" className='w-14 md:w-24 h-auto object-contain' />
                </Link>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex'>
                    <ul className='flex gap-5 capitalize'>
                        <li><NavLink to="/"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >Home</NavLink></li>
                        <li><NavLink to="/rules"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >Rules</NavLink></li>
                        <li><NavLink to="/leaderboard"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >Leaderboard</NavLink></li>
                        <li><NavLink to="/matches"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >matches</NavLink></li>
                        <li><NavLink to="/team"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >Our Team</NavLink></li>
                        <li><NavLink to="/admin"
                            className={({ isActive }) => isActive ? 'px-0.5 font-bold border-b text-blue-500 border-blue-500' : 'px-0.5 font-light'}
                        >Admin</NavLink></li>
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className='md:hidden relative'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={28} className={`absolute -top-4 -left-3.5 transition-all transform duration-200 ${true ? 'opacity-100 rotate-180' : 'opacity-0 rotate-0'}`} />
                </button>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className='fixed top-0 w-full h-screen duration-100 z-20 left-0  bg-black bg-opacity-90 flex flex-col items-center py-5 space-y-4 md:hidden' data-aos="fade-right">
                        <X onClick={() => setIsOpen(false)} size={28} className={`absolute right-3.5 transition-all transform duration-200 z-40 text-white ${isOpen ? 'opacity-100 rotate-180' : 'opacity-0 rotate-0'}`} />

                        <ul className='flex flex-col gap-4 text-lg capitalize text-center text-white pt-5'>
                            <li><NavLink to="/"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >Home</NavLink></li>
                            <li><NavLink to="/rules"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >Rules</NavLink></li>
                            <li><NavLink to="/leaderboard"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >Leaderboard</NavLink></li>
                            <li><NavLink to="/matches"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >matches</NavLink></li>
                            <li><NavLink to="/team"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >Our Team</NavLink></li>
                            <li><NavLink to="/admin"
                                className={({ isActive }) => isActive ? 'px-0.5 text-blue-500 font-bold' : 'px-0.5'}
                            >Admin</NavLink></li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
