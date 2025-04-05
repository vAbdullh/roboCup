import React from "react";

import { BsPinMap as Location } from "react-icons/bs";
import { PiCalendarDots as Calendar } from "react-icons/pi";
import { RiRobot2Line as Bot } from "react-icons/ri";
import { RiTeamLine as Team } from "react-icons/ri";
import { GiSoccerField as Field } from "react-icons/gi";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Rules = () => {
    const rulesData = {
        robotSpecifications: [
            "Maximum dimensions: 30 cm x 30cm x 20cm",
            "Weight limit: 3.5kg",
            "Must use remote control",
            "The robots must have a certification to enter King Faisal Conference Center",
            "Must move in 2D (X/Y axis)",
            "At least one team robot must be the seeker",
            "Robot must be clearly distinguished from each team either by color or markings",
            "Each robot of a team must have a number on it to identify them individually",
            "The substitution of robots during the competition within the team or with other teams is forbidden",
            "It is recommended to include protection circuits for lithium-based batteries if used",
            "Robots must not produce magnetic interference in other robots on the field"
        ],
        teamRequirements: [
            "3-4 members per team",
            "All members must have technical roles",
            "Each team must have a captain. The captain is responsible for communication with referees",
            "Contestants must consent to media coverage",
            "Members must allocate monetary award equally between them, and the management of the event is not responsible for any conflicts between them",
            "Sportsmanship",
            "The team must be present 30 minutes before the start of its match"
        ],
        matchRules: [
            "Each match consists of two teams. Each team has two robots.",
            "Each team holds one side of the field and the ball is in the middle.",
            "2 halves of 10 minutes each, with 10 minutes break.",
            "Group stage system (3 matches per team)",
            'The registered teams will be divided into groups of 4. Each team will play 3 matches and earn points: <ul class="list-disc pl-5 space-y-2"><li> 3 points for a win</li><li>1 point for a draw</li><li>0 points for a loss</li></ul>',
            "Teams in each group will be ranked by points from first to fourth. The top two teams from each group will advance.",
            "After taking the top two teams from each group, a knockout phase will begin, where the losing team is eliminated after each match",
            "<span class='text-red-400'> Robots are not allowed to crash into each other</span >"
        ],
        keyDates: [
            "Registration: April 6 to 12, 2025 </br> <span class='text-gray-400'>Teams can apply to participate in the competition during this period</span>",
            "Acceptance: April 14, 2025</br> <span class='text-gray-400'> Accepted teams will receive notifications via email sent to the team captains</span>",
            "Workshops: April 15-22, 2025</br> <span class='text-gray-400'> Participants will be divided into groups and sent details about workshop dates, locations, and directions.</span>",
            "Robotics Evaluation Day: may 3,2025",
            "Competitions Begin: May 4, 2025</br> <span class='text-gray-400'> The competition officially starts.</span>",
            "Daily matches: 11:30 PM - 2:45 PM",
        ],
        venueDetails: [
            "Jeddah, Saudi Arabia.",
            "King Abdulaziz University.",
            "King Faisal Conference Center.",
            "Dedicated maintenance areas provided.",
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 text-[#263741]">
            <Header dark_text />
            <div className="container mx-auto px-4 lg:px-8 flex flex-col gap-5 py-16">
                {/* Title Section */}
                <section>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">RoboCup 2025 Rules</h1>
                    <p className="text-lg">Key requirements for RoboCup 2025 participants</p>
                </section>

                {/* Rules Sections */}
                <section className="space-y-12">

                    {/* Match Rules */}
                    <div className="bg-white rounded-lg shadow p-8" data-aos="fade-up">
                        <div className="flex items-center mb-6">
                            <Field className="h-10 w-10 text-[#4ECDC4] mr-4" />
                            <p className="text-2xl font-bold">Match Rules</p>
                        </div>
                        <ul className="list-disc pl-8 space-y-2 text-gray-600">
                            {rulesData.matchRules.map((rule, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: rule }} />
                            ))}
                        </ul>
                    </div>

                    {/* Important Dates */}
                    <div className="bg-white rounded-lg shadow p-8" data-aos="fade-up">
                        <div className="flex items-center mb-6">
                            <Calendar className="h-10 w-10 text-[#4ECDC4] mr-4" />
                            <p className="text-2xl font-bold">Key Dates</p>
                        </div>
                        <ul className="list-disc pl-8 space-y-2 text-gray-600">
                            {rulesData.keyDates.map((rule, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: rule }}></li>
                            ))}
                        </ul>
                    </div>

                    {/* Robot Rules */}
                    <div className="bg-white rounded-lg shadow p-8" data-aos="fade-up">
                        <div className="flex items-center mb-6">
                            <Bot className="h-10 w-10 text-[#4ECDC4] mr-4" />
                            <p className="text-2xl font-bold">Robot Specifications</p>
                        </div>
                        <ul className="list-disc pl-8 space-y-2 text-gray-600">
                            {rulesData.robotSpecifications.map((rule, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: rule }} />
                            ))}
                        </ul>
                    </div>

                    {/* Team Requirements */}
                    <div className="bg-white rounded-lg shadow p-8" data-aos="fade-up">
                        <div className="flex items-center mb-6">
                            <Team className="h-10 w-10 text-[#4ECDC4] mr-4" />
                            <p className="text-2xl font-bold">Team Requirements</p>
                        </div>
                        <ul className="list-disc pl-8 space-y-2 text-gray-600">
                            {rulesData.teamRequirements.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Venue */}
                    <div className="bg-white rounded-lg shadow p-8" data-aos="fade-up">
                        <div className="flex items-center mb-6">
                            <Location className="h-10 w-10 text-[#4ECDC4] mr-4" />
                            <p className="text-2xl font-bold">Competition Venue</p>
                        </div>
                        <ul className="list-disc pl-8 space-y-2 text-gray-600">
                            {rulesData.venueDetails.map((rule, index) => (
                                <li key={index}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
            <Footer />
        </div>

    );
};

export default Rules;