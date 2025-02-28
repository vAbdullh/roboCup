import React from "react"
import { Linkedin, Youtube } from "lucide-react"

const XIcon = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
        stroke="currentColor"
        strokeWidth="2"
    >
        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
    </svg>
);

export default function Footer() {
    const socialLinks = [
        {
            name: "X (Twitter)",
            icon: <XIcon className="size-5 fill-gray-400 hover:fill-white transition-colors" />,
            href: "https://twitter.com/youraccount",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="size-5" />,
            href: "https://linkedin.com/company/yourcompany",
        },
        {
            name: "YouTube",
            icon: <Youtube className="size-5" />,
            href: "https://youtube.com/@yourchannel",
        },
    ]

    return (
        <footer className="w-full bg-[#263741] py-6 px-4 border-t">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Follow us</p>
                        <div className="flex items-center gap-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Separator */}
                    <hr className="w-full max-w-[240px] h-px border-gray-500" />

                    {/* Copyright */}
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} RoboCup. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
