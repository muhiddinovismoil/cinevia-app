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
    Mail,
    Phone,
    MapPin,
    Play,
} from "lucide-react";

// Types
interface FooterLink {
    to: string;
    label: string;
    icon?: any;
}

interface SocialLink {
    href: string;
    icon: any;
    label: string;
    color: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

// Constants
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

const FOOTER_SECTIONS: FooterSection[] = [
    { title: "Browse", links: NAVIGATION_LINKS },
    { title: "Discover", links: QUICK_LINKS },
    { title: "Support", links: SUPPORT_LINKS },
];

// Components
const Logo: React.FC = () => (
    <div className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-white/10 group-hover:ring-white/20 transition-all duration-300 transform group-hover:scale-105">
                    <img
                        src="/logo.png"
                        alt="Cinevia"
                        className="w-full h-full object-cover"
                        onError={(
                            e: React.SyntheticEvent<HTMLImageElement, Event>
                        ) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const fallback = target.nextSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                        }}
                    />
                    <div className="hidden w-full h-full bg-gradient-to-br from-red-500 via-purple-600 to-blue-600 items-center justify-center">
                        <Play className="h-5 w-5 text-white fill-white" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-black text-2xl bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Cinevia
                </span>
                <span className="text-sm text-gray-400 -mt-1">
                    Stream Unlimited
                </span>
            </div>
        </Link>

        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Your ultimate destination for movies, TV series, and cartoons.
            Stream unlimited entertainment with the best quality and experience.
        </p>

        <div className="flex items-center space-x-4">
            {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                    <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 ${social.color} transition-all duration-200 transform hover:scale-110`}
                        aria-label={social.label}
                    >
                        <Icon className="h-4 w-4" />
                    </a>
                );
            })}
        </div>
    </div>
);

const FooterSection: React.FC<{ section: FooterSection }> = ({ section }) => (
    <div className="space-y-4">
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            {section.title}
        </h3>
        <ul className="space-y-2">
            {section.links.map((link) => {
                const Icon = link.icon;
                const isExternal =
                    link.to.startsWith("mailto:") || link.to.startsWith("tel:");

                if (isExternal) {
                    return (
                        <li key={link.to}>
                            <a
                                href={link.to}
                                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                            >
                                {Icon && (
                                    <Icon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                                )}
                                <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                                    {link.label}
                                </span>
                            </a>
                        </li>
                    );
                }

                return (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
                        >
                            {Icon && (
                                <Icon className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity duration-200" />
                            )}
                            <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                                {link.label}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
);

const ContactInfo: React.FC = () => (
    <div className="space-y-4">
        <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
            Contact
        </h3>
        <div className="space-y-3">
            <a
                href="mailto:info@cinevia.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
            >
                <Mail className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                <span>info@cinevia.com</span>
            </a>
            <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-gray-400 hover:text-white text-sm transition-colors duration-200 group"
            >
                <Phone className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                <span>+1 (234) 567-890</span>
            </a>
            <div className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4 opacity-60 mt-0.5 flex-shrink-0" />
                <span>
                    123 Cinema Street
                    <br />
                    Hollywood, CA 90210
                </span>
            </div>
        </div>
    </div>
);

// Main Footer Component
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900 text-gray-300 mt-auto">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                    {/* Logo and Description */}
                    <div className="lg:col-span-2 xl:col-span-2">
                        <Logo />
                    </div>

                    {/* Footer Sections */}
                    {FOOTER_SECTIONS.map((section, _) => (
                        <div key={section.title} className="lg:col-span-1">
                            <FooterSection section={section} />
                        </div>
                    ))}

                    {/* Contact Info - Desktop */}
                    <div className="hidden xl:block">
                        <ContactInfo />
                    </div>

                    {/* Newsletter - Desktop */}
                </div>

                {/* Mobile Contact & Newsletter */}
            </div>

            {/* Bottom Bar */}
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
