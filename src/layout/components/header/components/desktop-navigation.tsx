import { Link } from "react-router-dom";
import type { NavItem } from "../types";
import type React from "react";

export const DesktopNavigation: React.FC<{ navItems: NavItem[] }> = ({
    navItems,
}) => (
    <nav className="hidden lg:flex items-center space-x-1">
        {navItems.map((item) => {
            const Icon = item.icon;
            return (
                <Link
                    key={item.to}
                    to={item.to}
                    className="group flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                    <Icon className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10 whitespace-nowrap">
                        {item.label}
                    </span>
                    <div className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-300 group-hover:w-4/5 transform -translate-x-1/2 rounded-full" />
                </Link>
            );
        })}
    </nav>
);
