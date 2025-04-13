import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaTwitter, FaLinkedin, FaUserTie, FaUserNurse, FaStar, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import { RiRobot2Fill, RiTwitterXFill } from 'react-icons/ri';
import { PiLinktreeLogoBold } from 'react-icons/pi';

export default function Team() {
    return (
        <div className="flex flex-col justify-between min-h-screen bg-gray-50">
            <Header dark_text />

            <main className="flex-grow min-h-screen container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h1 className="hidden">Our Team</h1>
                    <p className="text-4xl text-gray-900">Our Team</p>
                </div>

                <div className="space-y-8">
                    {departments.map((dept, index) => (
                        <div key={index} className="bg-white rounded-md shadow-md p-6" data-aos="fade-up" data-aos-delay={index * 100}>
                            <p className="text-xl font-semibold text-gray-800 mb-4">{dept.name} Department</p>
                            <div className="space-y-4">
                                {dept.members.map((member, idx) => (
                                    <div key={idx} className="flex items-center justify-between gap-4 border-l p-2 bg-gray-50">
                                        {/* Gender Icon */}
                                        <div className="text-3xl text-gray-600">
                                            {member.gender === 'female' ? <Female /> : <Male />}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <p className={`text-xs md:text-[16px] capitalize font-medium ${['Leader', 'Co-Leader', 'Sub Leader', 'president (ECEC)'].includes(member.role) ? 'text-yellow-600 font-bold' : 'text-gray-900'}`}>
                                                {member.name}
                                            </p>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>

                                        {/* Socials */}
                                        <div className="flex items-center gap-1 text-lg">
                                            {member.x && (
                                                <a href={member.x} target="_blank" rel="noopener noreferrer" className='rounded-full overflow-hidden'>
                                                    <RiTwitterXFill className="md:p-2 size-5 md:size-9 hover:bg-gray-200 aspect-square transition-all transform" />
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className='md:rounded-full overflow-hidden'>
                                                    <FaLinkedin className="md:p-2 size-5 md:size-9 hover:bg-gray-200 aspect-square transition-all transform" />
                                                </a>
                                            )}
                                            {member.social && (
                                                <a href={`${member.social}`} target="_blank" rel="noopener noreferrer" className='rounded-full overflow-hidden'>
                                                    <PiLinktreeLogoBold className="md:p-2 size-5 md:size-9 hover:bg-gray-200 aspect-square transition-all transform" />
                                                </a>
                                            )}
                                            {member.email && (
                                                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer" className='rounded-full overflow-hidden'>
                                                    <MdEmail className="md:p-2 size-5 md:size-9 hover:bg-gray-200 aspect-square transition-all transform" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

const Male = () => <div className='bg-blue-400 rounded-full px-1 pt-1 overflow-hidden aspect-square'>
    <RiRobot2Fill color='white' className='size-5 md:size-9' />
</div>
const Female = () => <div className='bg-fuchsia-400 rounded-full px-1 pt-1 overflow-hidden aspect-square'>
    <RiRobot2Fill color='white' className='size-5 md:size-9' />
</div>

const departments = [
    {
        "name": "Leadership",
        "members": [
            {
                "name": "Abdullah Mohammed Binsalman",
                "email": "a.binsalman03@Gmail.com",
                "role": "president (ECEC)",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/abdullah-binsalman-2b055b214/"
            },
            {
                "name": "Rahaf Abdulkhaliq Aladwani",
                "email": "aladwanirahaf2023@gmail.com",
                "role": "president (ECEC)",
                "gender": "female",
                "linkedin": "https://www.linkedin.com/in/rahaf-aladwani-68b3b82aa"
            },
            {
                "name": "Ashraqat Ali Alsalamah ",
                "email": "Ashraqata3@gmail.com",
                "role": "Manager",
                "gender": "female",
                "social": "https://linktr.ee/Ashraqat_Alsalamah"
            },
            {
                "name": "ahmed sameer abdueltawwab",
                "email": "hamoodesameer5@gmail.com",
                "role": "Sub manager",
                "gender": "male",
                "social": "https://linktr.ee/ahmed_abdeltawwab"
            },
            {
                "name": "Raed Mustafa Saidi",
                "email": "Raedmsaidi@gmail.com",
                "role": "Consultant",
                "gender": "male",
                "x": "https://x.com/raedsaidi0?s=21"
            }
        ]
    },
    {
        "name": "Public Relations",
        "members": [
            {
                "name": "Abdullah Fahad Alsulami",
                "email": "abdullahfahd515@gmail.com",
                "role": "Leader",
                "gender": "male"
            },
            {
                "name": "Luluah Ali Alhunaiti ",
                "email": "Luluahali04@gmail.com",
                "role": "Sub Leader",
                "gender": "female",
                "linkedin": "http://linkedin.com/in/luluah-alhunaiti-008155322"
            },
            {
                "name": "Abdelmoumen Ahmed Ibrahim Mohamed ",
                "email": "abdelmoumen.riyash@gmail.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/abdelmoumen_rh?s=09"
            },
            {
                "name": "Diyar Khaled Alharbe",
                "email": "diyar.business@outlook.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/diyarharbe?s=21"
            },
            {
                "name": "Mushrig Abdulbagi Ahmed",
                "email": "mushrig03@gmail.com",
                "role": "Member",
                "gender": "male"
            },
            {
                "name": "Bairoud Bint Mousa",
                "email": "bbir333m@gmail.com",
                "x": "https://x.com/bxro34",
                "role": "Member",
                "gender": "female"
            },
            {
                "name": "Asem Mohammed Noorsaeed ",
                "email": "asem5noor@gmail.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/3a_sm_?s=21&t=jnWmk83i7oU_AUvHKVB7oA"
            },
            {
                "name": "Alyazeed Mamdouh Alyamani ",
                "email": "alyazeed0566@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/alyazeed-alyamani-392b512a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            },
            {
                "name": "Omar Abdulaziz Altheneyan",
                "email": "omar22.th@gmail.com",
                "role": "Member",
                "gender": "male"
            },
            {
                "name": "Ghala Ahmed Alzahrani",
                "email": "ghalaalzahrani215@gmail.com",
                "role": "Member",
                "gender": "female",
                "linkedin": "https://www.linkedin.com/in/ghala-alzahrani"
            },
            {
                "name": "Layan sulaiman Aljasser",
                "email": "layaaljasser@gmail.com",
                "role": "Member",
                "gender": "female",
                "x": "https://x.com/layanssj?s=21"
            }, {
                "name": "Diyar Khaled Alharbe",
                "email": "diyar.business@outlook.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/diyarharbe"
            }
        ]
    },
    {
        "name": "Planning",
        "members": [
            {
                "name": "Anas Ahmaed Bajbaa",
                "email": "anasdx.a.b@gmail.com",
                "role": "Leader",
                "gender": "male",
                "linkedin": "http://www.linkedin.com/in/anas-bajbaa-1b46b2302"
            },
            {
                "name": "Al-Mahdi Mohammed Sairafi",
                "email": "almahdisairafi@gmail.com",
                "role": "Sub Leader",
                "gender": "male",
                "x": "https://x.com/almahdisairafi?s=21&t=O2WUaECJSl_3xKgCNXhpHw"
            },
            {
                "name": "Ibrahim Eldom Mohamed",
                "email": "Ibrahimaldoom.b@gmail.com",
                "role": "Member",
                "gender": "male"
            },
            {
                "name": "Mohammad Saleh Alzahrani",
                "email": "Zahranimsdz@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "http://linkedin.com/in/zahranimsdz"
            }
        ]
    },
    {
        "name": "Marketing",
        "members": [
            {
                "name": "Reemas Wael Alfaqih",
                "email": "alfaqihreemas@gmail.com",
                "role": "Leader",
                "gender": "female",
                "x": "https://x.com/remalfq?s=21"
            },
            {
                "name": "Anjal Ahmed AlArfaj",
                "email": "anjalaa1@hotmail.com",
                "role": "Sub Leader",
                "gender": "female",
                "x": "https://x.com/iq2f8_"
            },
            {
                "name": "Salem Abdullah Bahammam",
                "email": "salem.graphic.designer@gmail.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/SalemDesigners"
            },
            {
                "name": "Alaa Ramadan Almalti",
                "email": "Alaarmalti154@gmail.com",
                "role": "Member",
                "gender": "female",
                "linkedin": "https://www.linkedin.com/in/alaa-almalti-2821b9330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            },
            {
                "name": "Abdullah Mansour Alhalawani ",
                "email": "contact@abdullh.tech",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/devabdullh"
            },
            {
                "name": "Abdullah Yahya Alzahrani ",
                "email": "aymhkz@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/abdullah-alzahrani-2706531b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            },
            {
                "name": "Jawad Ghassan Ghafouri ",
                "email": "jawad.ghasan321@gmail.com",
                "role": "Member",
                "gender": "male"
            },
            {
                "name": "Nouf sadiq ghalib ali",
                "email": "Noufaltaiar@gmail.com",
                "role": "Member",
                "gender": "female"
            },
            {
                "name": "Ghazi Mubarak Alhasah",
                "email": "ghazialhasah@gmail.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/ghazi_mubarak"
            },
            {
                "name": "Ahmed Salem Al-Harthy",
                "email": "AhmedAlharthy018@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/ahmed-al-harthy-406684315"
            },
        ]
    },
    {
        "name": "Technical",
        "members": [
            {
                "name": "meshal awad allah alsulami",
                "email": "meshalalsulme@gmail.com",
                "role": "Leader",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/meshal-al-sulami-7b3b5024b/"
            },
            {
                "name": "Anas Abdullah Abdulaziz",
                "email": "abdullahanas.f@gmail.com",
                "role": "Sub Leader",
                "gender": "male",
                "x": "https://x.com/rans_o4?s=21"
            },
            {
                "name": "Faris Mujahed AlBukhari",
                "email": "farisalbukhari22@gmail.com",
                "role": "Member",
                "gender": "male",
                "x": "https://x.com/ifaris7z?s=21&t=C7X468te4veHJTXnrcqixg"
            },
            {
                "name": "Ammar Khalid Alahmadi",
                "email": "ammorp10@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "www.linkedin.com/in/ammar-alahmadi-a50783319"
            },
            {
                "name": "Abdulrahman Eissa Alkhamisi",
                "email": "aealkhamisi@gmail.com",
                "role": "Member",
                "gender": "male",
                "linkedin": "https://www.linkedin.com/in/abdulrahman-alkhamisi-373191269/"
            },
            {
                "name": "Layan Basil Bader",
                "email": "Loloblbr@gmail.com",
                "role": "Member",
                "gender": "female",
                "linkedin": "https://www.linkedin.com/in/layan-bader-5417aa175?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            }
        ]
    }
]