import { Mail, MapPin, Phone } from "lucide-react";

export const ContactInfo: React.FC = () => (
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
