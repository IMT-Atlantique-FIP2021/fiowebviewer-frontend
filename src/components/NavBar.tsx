import { FC } from "react";
import { Search, FileText, Book, IconProps } from "react-feather";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div id="NAVBAR" className="bg-blue-ovh-light">
            <div className="container mx-auto">
                <div className="flex flex-row">
                    <Link to="/">
                        <NavBarItem icon={Search} text="Result Table" />
                    </Link>

                    <Link to="/download">
                        <NavBarItem icon={FileText} text="Download Script" />
                    </Link>

                    <div className="flex-grow"></div>

                    <Link to="/docs">
                        <NavBarItem icon={Book} text="Docs" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

type NavBarItemProps = {
    icon: FC<IconProps>;
    text: string;
};

function NavBarItem(props: NavBarItemProps) {
    return (
        <div className="px-5">
            <div className="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                <div className="flex flex-row items-center">
                    <props.icon className="mr-1 h-5" />
                    {props.text}
                </div>
            </div>
        </div>
    );
}
