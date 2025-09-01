import type React from "react";
import type { UserMenuProps } from "../types";
import { Bookmark, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { removeCookieState } from "@/config";
import toast from "react-hot-toast";

export const UserMenu: React.FC<UserMenuProps> = ({
    data,
    isLoading,
    isLoggedIn,
    dropdownOpen,
    setDropdownOpen,
    dropdownRef,
    setIsLoggedIn,
}) => {
    return (
        <div className="hidden sm:block">
            {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                    <button
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-900/40 to-gray-800/40 hover:from-gray-800/60 hover:to-gray-700/60 text-white border border-gray-700/50 hover:border-gray-600/50 transition-all duration-200"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        aria-expanded={dropdownOpen}
                        aria-haspopup="true"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="h-6 w-6 rounded-full bg-gray-700 animate-pulse" />
                        ) : data?.photo ? (
                            <img
                                src={data.photo}
                                alt={"profile photo"}
                                className="h-6 w-6 rounded-full object-cover"
                            />
                        ) : (
                            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-red-500 to-purple-600 flex items-center justify-center">
                                <img
                                    src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3396.jpg"
                                    className="h-6 w-6 text-white object-cover rounded-full"
                                />
                            </div>
                        )}

                        {!isLoading && (
                            <span className="hidden lg:inline text-sm font-medium">
                                {data?.fullname}
                            </span>
                        )}

                        {!isLoading && (
                            <ChevronDown
                                className={`h-3 w-3 transition-transform duration-200 ${
                                    dropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        )}
                    </button>

                    {dropdownOpen && !isLoading && (
                        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-800/50 bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-200">
                            <div className="p-3 border-b border-gray-800/50">
                                <p className="text-sm font-medium text-white">
                                    {data?.fullname}
                                </p>
                            </div>
                            <div className="p-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    <span>My Profile</span>
                                </Link>
                                <Link
                                    to="/watchlist"
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <Bookmark className="h-4 w-4" />
                                    <span>My Watchlist</span>
                                </Link>
                                <Link
                                    to="/settings"
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                                <div className="border-t border-gray-800/50 my-2" />
                                <button
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-all duration-200 w-full text-left"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        removeCookieState("token");
                                        setIsLoggedIn(false);
                                        toast.success(
                                            "Successfully signed out"
                                        );
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link
                        to="/signup"
                        className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 hidden md:block"
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/signin"
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
};
