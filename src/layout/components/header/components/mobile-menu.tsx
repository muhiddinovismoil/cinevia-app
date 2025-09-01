import { Link } from "react-router-dom";
import { Bookmark, User } from "lucide-react";
import type { MobileMenuProps } from "../types";
import type React from "react";

export const MobileMenu: React.FC<MobileMenuProps> = ({
    menuOpen,
    setMenuOpen,
    navItems,
    isLoggedIn,
}) => (
    <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
    >
        <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 shadow-2xl rounded-b-xl mx-2 sm:mx-4 mt-2">
            <div className="p-3 sm:p-4 space-y-1">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 animate-in slide-in-from-left-5 fade-in-0"
                            style={{ animationDelay: `${index * 50}ms` }}
                            onClick={() => setMenuOpen(false)}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
                <div className="border-t border-gray-800/50 pt-3 mt-3">
                    {isLoggedIn ? (
                        <div className="space-y-1">
                            <Link
                                to="/profile"
                                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                <User className="h-4 w-4" />
                                <span>My Profile</span>
                            </Link>
                            <Link
                                to="/watchlist"
                                className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                                onClick={() => setMenuOpen(false)}
                            >
                                <Bookmark className="h-4 w-4" />
                                <span>My Watchlist</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <Link
                                to="/signup"
                                className="block w-full px-3 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Create Account
                            </Link>
                            <Link
                                to="/signin"
                                className="block w-full px-3 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 text-center transform hover:scale-[1.02] active:scale-[0.98]"
                                onClick={() => setMenuOpen(false)}
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
);
