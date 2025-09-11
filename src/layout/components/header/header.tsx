import { useState, useRef, useEffect } from "react";
import { X, Menu, Film, Heart, Tv } from "lucide-react";
import { useForm } from "react-hook-form";
import {
    DesktopNavigation,
    Logo,
    MobileMenu,
    SearchComponent,
    UserMenu,
} from "./components";
import type { HeaderProps, NavItem } from "./types";
import { useAuthListener, useDebouncedValue } from "@/hook";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS: NavItem[] = [
    { to: "/movies", label: "Movies", icon: Film },
    { to: "/series", label: "TV Series", icon: Tv },
    { to: "/cartoons", label: "Cartoons", icon: Heart },
];

export const Header = ({ data, isLoading }: HeaderProps) => {
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const { isLoggedIn, setIsLoggedIn } = useAuthListener();

    const { register, handleSubmit, watch, reset } = useForm<{
        searchQuery: string;
    }>();
    const searchValue = watch("searchQuery");
    const navigate = useNavigate();
    const [debouncedSearch] = useDebouncedValue(searchValue, 500);

    useEffect(() => {
        if (debouncedSearch?.trim()) {
            navigate(`/search?q=${encodeURIComponent(debouncedSearch.trim())}`);
        }
    }, [debouncedSearch, navigate]);

    useEffect(() => {
        if (debouncedSearch?.trim()) {
        }
    }, [debouncedSearch]);

    const onSearchSubmit = handleSubmit((data) => {
        if (data.searchQuery.trim()) {
            setSearchOpen(false);
            reset();
        }
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        const handleScroll = () => setScrolled(window.scrollY > 10);

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [menuOpen]);

    useEffect(() => {
        if (searchOpen && searchRef.current) searchRef.current.focus();
    }, [searchOpen]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                scrolled
                    ? "bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/25"
                    : "bg-gradient-to-b from-gray-950/90 via-gray-950/70 to-transparent backdrop-blur-sm"
            }`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-transparent to-gray-950/50" />
            <div className="relative container mx-auto px-3 sm:px-4 lg:px-6">
                <div className="flex h-14 sm:h-16 items-center justify-between">
                    <div className="flex items-center flex-shrink-0">
                        <Logo />
                    </div>

                    <DesktopNavigation navItems={NAV_ITEMS} />

                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <SearchComponent
                            searchOpen={searchOpen}
                            setSearchOpen={setSearchOpen}
                            searchRef={searchRef}
                            register={register("searchQuery")}
                            onSubmit={onSearchSubmit}
                        />

                        <UserMenu
                            data={data}
                            isLoading={isLoading}
                            isLoggedIn={isLoggedIn}
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                            setIsLoggedIn={setIsLoggedIn}
                            dropdownRef={dropdownRef}
                        />

                        <button
                            className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-gray-900/40 hover:bg-gray-800/60 text-gray-300 hover:text-white transition-all duration-200 flex items-center justify-center"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="Toggle mobile menu"
                            aria-expanded={menuOpen}
                        >
                            <div
                                className={`transform transition-transform duration-300 ${
                                    menuOpen ? "rotate-90" : ""
                                }`}
                            >
                                {menuOpen ? (
                                    <X className="h-4 w-4" />
                                ) : (
                                    <Menu className="h-4 w-4" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                <MobileMenu
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    navItems={NAV_ITEMS}
                    isLoggedIn={isLoggedIn}
                />
            </div>
        </header>
    );
};
