import React from 'react'

export default function Timeline() {
    const events = [
        {
            title: 'Registration',
            date: 'April 6-12, 2025',
            description: 'Teams register to participate in the competition.'
        },
        {
            title: 'Acceptance',
            date: 'April 14, 2025',
            description: 'Teams are notified of their acceptance into the competition.'
        },
        {
            title: 'Workshops and Tutorials',
            date: 'April 15-22, 2025',
            description: 'Workshops and tutorials for the competition.'
        },
        {
            title: 'Robotics Evaluation Day',
            date: 'May 5, 2025',
            description: 'Evaluation day for the robots.'
        },
        {
            title: 'Competitions Begin',
            date: 'May 6-8, 2025',
            description: 'The competition begins.'
        },
    ]
    return (
        <div className='p-5 mx-auto xl:px-8 bg-[#263741]'>
            <ol className="items-center xl:flex md:items-start">
                {events.map((event, index) => (
                    <li key={index} className="relative mb-6 xl:mb-0 xl:w-60" data-aos="fade-right" data-aos-duration={`10${index}0`}>
                        <div className="flex items-center">
                            <div className="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 xl:ring-8 dark:ring-gray-900 shrink-0">
                                <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <div className="hidden xl:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                        </div>
                        <div className="mt-3 xl:pe-8">
                            <p className="text-lg text-white">{event.title}</p>
                            <time className="block mb-2 text-sm font-extralight leading-none text-gray-200">{event.date}</time>
                            <p className="text-base font-extralight text-gray-300">{event.description}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    )
}
