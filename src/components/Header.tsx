import { Link } from "react-router-dom";
import FIOLogo from "../assets/logo.svg";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <div id="HEADER" className="bg-blue-ovh-dark py-7">
            <div className="container mx-auto px-5">
                <div className="flex flex-row justify-between">
                    <Link
                        to="/"
                        className="flex items-center text-white group"
                    >
                        <img src={FIOLogo} className="h-7" alt="" />
                        <div className="font-bold text-2xl ml-1 mr-3">FLEX</div>
                        <div className="font-light text-xl opacity-80 group-hover:opacity-100">
                            Flexible I/O Explorer
                        </div>
                    </Link>
                    {/* <ThemeToggle /> */}
                </div>
            </div>
        </div>
    );
}
