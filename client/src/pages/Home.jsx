import React, { useRef } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/hero.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
import SARIcon from "../assets/sar.svg";

import { MdKeyboardDoubleArrowRight as ArrowRight } from "react-icons/md";
import { LuTrophy as Trophy } from "react-icons/lu";
import { CiLocationOn as Location } from "react-icons/ci";
import { PiCalendarDots as Calendar } from "react-icons/pi";
import { RiRobot2Line as Robot } from "react-icons/ri";
import { MdOutlineTimer as Timer } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { LuScrollText } from "react-icons/lu";

export default function Home() {
    const aboutRef = useRef(null);

    const scrollToAbout = () => {
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const openRegisterFrom = () => {
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSfTpbSF6uQxt0oO2wCgNJRkIkcNyCcEpXZ0F2QX9GomKyWAng/viewform?usp=preview", "_blank");
    }

    return (

        <div className="">
            <section
                className="h-svh w-full bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <Header />

                <div className="h-full w-full bg-black/75 flex flex-col gap-5 md:items-center justify-center text-white md:text-center p-3 ">
                    <h1 className="text-5xl md:text-9xl font-bold" data-aos="fade-up" data-aos-duration="1000">
                        RoboCup 2025
                    </h1>
                    <p className="max-w-7xl text-sm md:text-xl" data-aos="fade-up" data-aos-duration="1000">
                        Join RoboCup 2025, the first of its kind to be held in the Kingdom of Saudi Arabia, where teams build and program robots to compete in an exciting football challenge.
                    </p>
                    <div className="flex gap-4 flex-col md:flex-row items-center justify-center w-full max-w-2xl mx-auto">
                        <button
                            onClick={openRegisterFrom}
                            data-aos="fade-up" data-aos-duration="1000"
                            className="w-full grow-1 group flex items-center justify-center gap-3 
                                       bg-[#263741] hover:bg-[#344955]
                                      text-white font-semibold text-xl
                                       px-8 py-4 rounded-lg
                                       transform hover:-translate-y-0.5 active:translate-y-0
                                        transition-all duration-200
                                        shadow-lg hover:shadow-xl active:shadow text-center"
                        >
                            Register Now
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={scrollToAbout}
                            data-aos="fade-up" data-aos-duration="1000"
                            className="w-full roup flex items-center justify-center gap-3 
                border-white text-white font-semibold text-xl
                 border px-8 py-4 rounded-lg capitalize
                 transform hover:-translate-y-0.5 active:translate-y-0
                 transition-all duration-200
                 shadow-lg hover:shadow-xl active:shadow text-center"
                        >
                            learn more
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section ref={aboutRef} className="w-full py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 text-[#263741] min-h-screen flex items-center">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3" data-aos="fade-up" data-aos-duration="1000">
                            <Robot className="h-10 w-10 text-[#4ECDC4]" />
                            <span>What is RoboCup?</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 capitalize" data-aos="fade-up" data-aos-duration="1000">
                            technological challenge that combines engineering and programming skills in an entertaining and educational way. It involves designing, building, and programming robots to compete on a miniature football field. As the first of its kind in Saudi Arabia, it promotes STEM skills, innovation, and collaboration with major football clubs.
                        </p>
                    </div>

                    <div className="grid justify-items-center grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 w-full mt-6">
                        {/* Prize Pool Card */}
                        <div
                            className="relative bg-white rounded-xl p-8 flex flex-col items-start gap-6 shadow-md w-80 md:w-96 overflow-hidden"
                            data-aos="fade-up" data-aos-duration="1500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                            <h3 className="font-bold text-2xl sm:text-3xl flex gap-3 items-center">
                                <div className="p-3 bg-amber-100 rounded-lg transition-transform">
                                    <Trophy className="h-8 w-8 text-amber-500" strokeWidth={1.8} />
                                </div>
                                <span>Prize Pool</span>
                            </h3>
                            <ul className="space-y-4 w-full md:text-lg">
                                <li className="flex items-center gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">1st Place:</span>
                                    <span className="text-amber-600 font-semibold flex gap-2 items-center">
                                        <img src={SARIcon} alt="SAR" className="size-5" />
                                        2,500
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">2nd Place:</span>
                                    <span className="text-amber-600 font-semibold flex gap-2 items-center">
                                        <img src={SARIcon} alt="SAR" className="size-5" />
                                        1,500
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">3rd Place:</span>
                                    <span className="text-amber-600 font-semibold flex gap-2 items-center">
                                        <img src={SARIcon} alt="SAR" className="size-5" />
                                        1,000
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Location Card */}
                        <div
                            className="relative bg-white rounded-xl p-8 flex flex-col items-start gap-6 shadow-md  w-80 md:w-96 overflow-hidden"
                            data-aos="fade-up" data-aos-duration="1500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600" />
                            <h3 className="font-bold text-2xl sm:text-3xl flex gap-3 items-center">
                                <div className="p-3 bg-red-100 rounded-lg transition-transform">
                                    <Location className="h-8 w-8 text-red-500" strokeWidth={1} />
                                </div>
                                <span>Location</span>
                            </h3>
                            <ul className="space-y-4 w-full md:text-lg">
                                <li className="flex gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">City:</span>
                                    <span>Saudi Arabia, Jeddah</span>
                                </li>

                                <li className="flex gap-3 pl-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">Address:</span>
                                    <span>King Abdulaziz university</span>
                                </li>
                                <li className="flex gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">Building:</span>
                                    <span>King Faisal Conference Center</span>
                                </li>
                            </ul>
                        </div>

                        {/* Date & Time Card */}
                        <div
                            className="relative bg-white rounded-xl p-8 flex flex-col items-start gap-6 shadow-md w-80 md:w-96 overflow-hidden"
                            data-aos="fade-up" data-aos-duration="1500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600" />
                            <h3 className="font-bold text-2xl sm:text-3xl flex gap-3 items-center">
                                <div className="p-3 bg-blue-100 rounded-lg transition-transform">
                                    <Calendar className="h-8 w-8 text-blue-500" strokeWidth={2} />
                                </div>
                                <span>Date & Time</span>
                            </h3>
                            <ul className="space-y-4 w-full md:text-lg">
                                <li className="flex gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">Start Date:</span>
                                    <span>May 3, 2025</span>
                                </li>
                                <li className="flex gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">End Date:</span>
                                    <span>May 6, 2025</span>
                                </li>
                                <li className="flex gap-3 p-3 rounded-lg transition-colors">
                                    <span className="font-semibold min-w-24">Daily Hours:</span>
                                    <span>12:30 PM - 4:00 PM</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className="w-full py-16 px-4 sm:px-6 bg-[#263741] text-white flex flex-col items-center justify-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3" >
                    <Timer className="h-10 w-10 text-[#4ECDC4]" />
                    Timeline
                </h2>
                <Timeline />
            </section>

            {/* Section 4 */}
            <section className="w-full py-16 px-4 sm:px-6 bg-white text-[#263741] grid place-items-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3" data-aos="fade-up" data-aos-duration="1000">
                    <LuScrollText className="h-10 w-10 text-[#4ECDC4]" />
                    Rules
                </h2>
                <div className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600" data-aos="fade-up" data-aos-duration="1000">
                    <ul className='space-y-3 list-disc pl-5'>
                        <li>
                            Contestants must be registered in teams. The teams must have 2 to 4 members, with one designated captain responsible for communication with referees.
                        </li>
                        <li>
                            All members must have a technical role, and teams must fairly share any monetary awards.
                        </li>
                        <li>
                            Robots must be remotely controlled and move in two dimensions (X & Y axis), and have certification to enter King Faisal Conference Center.
                        </li>
                        <li>
                            Dimensions of robots must not exceed: <span className="whitespace-nowrap">22 cm x 22 cm x 22 cm</span>, and weight must not exceed 2.2 Kg. </li>
                    </ul>
                </div>
                <Link to="/rules"
                    data-aos="fade-up" data-aos-duration="900"
                    className="border-b border-blue-400 transform transition-all duration-300 cursor-pointer p-2 mx-auto font-medium capitalize flex items-center gap-2 text-blue-400 active:translate-y-1">
                    <p>Explore more deities</p>
                    <FaLink className="text-xl" />
                </Link>
            </section >

            <Footer />
        </div >
    );
}
