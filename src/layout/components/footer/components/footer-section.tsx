import { Link } from "react-router-dom";
import type { FooterSectionI } from "../types";

export const FooterSection: React.FC<{ section: FooterSectionI }> = ({
    section,
}) => (
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
