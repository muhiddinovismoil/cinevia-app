export interface FooterLink {
    to: string;
    label: string;
    icon?: any;
}

export interface SocialLink {
    href: string;
    icon: any;
    label: string;
    color: string;
}

export interface FooterSectionI {
    title: string;
    links: FooterLink[];
}
