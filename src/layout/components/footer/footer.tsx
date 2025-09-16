import React from "react";
import { Link } from "react-router-dom";
import {
    Film,
    Tv,
    Heart,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";
import type { FooterLink, FooterSectionI, SocialLink } from "./types";
import { ContactInfo, Logo } from "./components";
import { FooterSection } from "./components/footer-section";

const NAVIGATION_LINKS: FooterLink[] = [
    { to: "/movies", label: "Movies", icon: Film },
    { to: "/series", label: "TV Series", icon: Tv },
    { to: "/cartoons", label: "Cartoons", icon: Heart },
];

const QUICK_LINKS: FooterLink[] = [
    { to: "/trending", label: "Trending" },
    { to: "/top-rated", label: "Top Rated" },
    { to: "/new-releases", label: "New Releases" },
    { to: "/coming-soon", label: "Coming Soon" },
];

const SUPPORT_LINKS: FooterLink[] = [
    { to: "/help", label: "Help Center" },
    { to: "/contact", label: "Contact Us" },
    { to: "/faq", label: "FAQ" },
    { to: "/feedback", label: "Feedback" },
];

const SOCIAL_LINKS: SocialLink[] = [
    {
        href: "https://facebook.com",
        icon: Facebook,
        label: "Facebook",
        color: "hover:text-blue-500",
    },
    {
        href: "https://twitter.com",
        icon: Twitter,
        label: "Twitter",
        color: "hover:text-sky-500",
    },
    {
        href: "https://instagram.com",
        icon: Instagram,
        label: "Instagram",
        color: "hover:text-pink-500",
    },
    {
        href: "https://youtube.com",
        icon: Youtube,
        label: "YouTube",
        color: "hover:text-red-500",
    },
];

const FOOTER_SECTIONS: FooterSectionI[] = [
    { title: "Browse", links: NAVIGATION_LINKS },
    { title: "Discover", links: QUICK_LINKS },
    { title: "Support", links: SUPPORT_LINKS },
];

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900 text-gray-300 mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                    <div className="lg:col-span-2 xl:col-span-2">
                        <Logo SOCIAL_LINKS={SOCIAL_LINKS} />
                    </div>

                    {FOOTER_SECTIONS.map((section, _) => (
                        <div key={section.title} className="lg:col-span-1">
                            <FooterSection section={section} />
                        </div>
                    ))}

                    <div className="hidden xl:block">
                        <ContactInfo />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800/50 bg-gray-950/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                            <span>
                                © {currentYear} Cinevia. All rights reserved.
                            </span>
                            <div className="hidden sm:block w-px h-4 bg-gray-700" />
                            <span>Made with ❤️ for movie lovers</span>
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                            <Link
                                to="/privacy"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Privacy
                            </Link>
                            <div className="w-px h-4 bg-gray-700" />
                            <Link
                                to="/terms"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Terms
                            </Link>
                            <div className="w-px h-4 bg-gray-700" />
                            <Link
                                to="/cookies"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
