import { GitHub } from "react-feather";
import packageJSON from "../../package.json";

export default function Footer() {
    return (
        <div id="FOOTER" className="bg-blue-ovh-light py-5">
            <div className="container mx-auto px-5">
                <div className="flex flex-row justify-between">
                    <div className="text-white font-light">OVHCloud © 2021</div>
                    <div className="flex space-x-2">
                        <a
                            href="https://github.com/IMT-Atlantique-FIP2021/"
                            className="text-white font-light hover:underline flex group"
                        >
                            Source code available on
                            <GitHub className="ml-2 opacity-80 group-hover:opacity-100" />
                        </a>
                        <div className="text-white font-bold">
                            v{packageJSON.version}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
