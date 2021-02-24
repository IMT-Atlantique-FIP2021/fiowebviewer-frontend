import { Book, FileText, GitHub, Moon, Search, Sun } from "react-feather";
import FIOLogo from "../assets/logo.svg";

function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-auto bg-gray-200 dark:bg-gray-800">
        <div id="HEADER" className="bg-blue-ovh-dark py-7">
          <div className="container mx-auto px-5">
            <div className="flex flex-row justify-between">
              <a
                id="BRAND"
                className="flex items-center text-white group"
                href="/"
              >
                <img src={FIOLogo} className="h-7" alt="" />
                <div className="font-bold text-2xl ml-1 mr-3">FLEX</div>
                <div className="font-light text-xl opacity-80 group-hover:opacity-100">
                  Flexible I/O Explorer
                </div>
              </a>
              <Sun className="text-white opacity-80 hover:opacity-100" />
              {/* <Moon className="text-white opacity-80 hover:opacity-100"/> */}
            </div>
          </div>
        </div>

        <div id="NAVBAR" className="bg-blue-ovh-light">
          <div className="container mx-auto">
            <div className="flex flex-row">
              <div className="px-5">
                <div className="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="/" className="flex flex-row items-center">
                    <Search className="mr-1 h-5" />
                    Result Explorer
                  </a>
                </div>
              </div>
              <div className="px-5">
                <div className="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="/" className="flex flex-row items-center">
                    <FileText className="mr-1 h-5" />
                    Download Script
                  </a>
                </div>
              </div>
              <div className="flex-grow"></div>
              <div className="px-5">
                <div className="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="/" className="flex flex-row items-center">
                    <Book className="mr-1 h-5" />
                    Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="container mx-auto px-5">
            <div className="text-white">CONTENT</div>
          </div>
        </div>
      </div>

      <div id="FOOTER" className="bg-blue-ovh-light py-5">
        <div className="container mx-auto px-5">
          <div className="flex flex-row justify-between">
            <div className="text-white font-light">OVHCloud © 2021</div>
            <a
              href="https://github.com/IMT-Atlantique-FIP2021/fiowebviewer-frontend"
              className="text-white font-light hover:underline flex group"
            >
              Source code available on
              <GitHub className="ml-2 opacity-80 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
