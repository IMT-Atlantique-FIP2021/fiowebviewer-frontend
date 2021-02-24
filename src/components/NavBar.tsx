import { Book, FileText, Search } from "react-feather";
import NavBarItem from "./NavBarItem";

export default function NavBar() {
    return (
        <div id="NAVBAR" className="bg-blue-ovh-light">
            <div className="container mx-auto">
                <div className="flex flex-row">
                    <NavBarItem
                        href="/"
                        icon={Search}
                        title="Result Explorer"
                    />

                    <NavBarItem
                        href="/"
                        icon={FileText}
                        title="Download Script"
                    />

                    <div className="flex-grow"></div>

                    <NavBarItem href="/" icon={Book} title="Docs" />
                </div>
            </div>
        </div>
    );
}
