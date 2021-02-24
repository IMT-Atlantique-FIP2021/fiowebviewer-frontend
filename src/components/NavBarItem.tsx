import { FC } from "react";
import { IconProps } from "react-feather";

type NavBarItemProps = {
    href: string;
    icon: FC<IconProps>;
    title: string;
};

export default function NavBarItem(props: NavBarItemProps) {
    const NavBarIcon = props.icon;

    return (
        <div className="px-5">
            <div className="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                <a href={props.href} className="flex flex-row items-center">
                    <NavBarIcon className="mr-1 h-5" />
                    {props.title}
                </a>
            </div>
        </div>
    );
}
