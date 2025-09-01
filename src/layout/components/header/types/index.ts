import type React from "react";
import type { LucideIcon } from "lucide-react";
import type { UserProfileDataI } from "@/pages/profile/types";

export interface NavItem {
    to: string;
    label: string;
    icon: LucideIcon;
}

export interface MobileMenuProps {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    navItems: NavItem[];
    isLoggedIn: boolean;
}

export interface UserMenuProps {
    isLoading: boolean;
    data: UserProfileDataI;
    isLoggedIn: boolean;
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    setIsLoggedIn: (val: boolean) => void;
}

export interface SearchProps {
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    register: ReturnType<any>;
    onSubmit: (e?: React.FormEvent) => void;
    searchRef: React.RefObject<HTMLInputElement | null>;
}

export interface HeaderProps {
    isLoading: boolean;
    data: UserProfileDataI;
}
