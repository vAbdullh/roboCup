import React from 'react'

export default function Header() {
    return (
        <header className='py-5 px-7 xl:px-10 flex justify-between items-center'>
            <div className='text-2xl font-bold'>
                RoboCup
            </div>
            <nav>
                {/* <ul className='flex gap-5'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul> */}
            </nav>
        </header>
    )
}
