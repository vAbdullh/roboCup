import React from "react"
import {
    FaYoutube as Youtube,
    FaLinkedinIn as Linkedin,
    FaTiktok as Tiktok
} from "react-icons/fa";
import { FaXTwitter as XIcon } from "react-icons/fa6";

export default function Footer() {
    const socialLinks = [
        {
            name: "X (Twitter)",
            icon: <XIcon className="size-5" />,
            href: "https://x.com/kau_ecec",
        },
        {
            name: "Tiktok",
            icon: <Tiktok className="size-5" />,
            href: "https://www.tiktok.com/@ecec.kau",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="size-5" />,
            href: "https://www.linkedin.com/company/kauecec/",
        },
        {
            name: "YouTube",
            icon: <Youtube className="size-5" />,
            href: "https://youtube.com/@kauecec",
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
                                    className="text-gray-400 hover:text-white transition-colors size-8"
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
                        © {new Date().getFullYear()} RoboCup. {/*All rights reserved.*/}
                    </p>
                </div>
            </div>
        </footer>
    )
}
