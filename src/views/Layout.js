import FIOLogo from "../assets/logo.svg";

function DashboardLayout() {
  const ThemeMode = "dark" | "light";

  return (
    <div class="flex flex-col min-h-screen dark" id="<-DARK_MODE_TESTER">
      <div></div>

      <div class="flex-auto bg-gray-200 dark:bg-gray-800">
        <div id="HEADER" class="bg-blue-ovh-dark py-7">
          <div class="container mx-auto px-5">
            <div class="flex flex-row justify-between">
              <a
                id="BRAND"
                class="flex items-center space-x-2 text-white group"
                href="#"
              >
                <img src={FIOLogo} className="h-7" />
                <div class="font-bold text-2xl">FLEX</div>
                <div class="font-light text-xl opacity-80 group-hover:opacity-100">
                  Flexible I/O Explorer
                </div>
              </a>
              <button
                id="THEME_BTN"
                class="text-white opacity-80 hover:opacity-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-moon"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> */}
              </button>
            </div>
          </div>
        </div>

        <div id="NAVBAR" class="bg-blue-ovh-light">
          <div class="container mx-auto">
            <div class="flex flex-row">
              <div class="px-5">
                <div class="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="#" class="flex flex-row items-center">
                    <svg
                      class="feather feather-search mr-1 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    Result Explorer
                  </a>
                </div>
              </div>
              <div class="px-5">
                <div class="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="#" class="flex flex-row items-center">
                    <svg
                      class="feather feather-file-text mr-1 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    Download Script
                  </a>
                </div>
              </div>
              <div class="flex-grow"></div>
              <div class="px-5">
                <div class="text-white font-semibold py-4 opacity-70 hover:opacity-100 hover:border-gray-200 border-blue-ovh-light border-b-2">
                  <a href="#" class="flex flex-row items-center">
                    <svg
                      class="feather feather-book mr-1 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <div class="container mx-auto px-5">
            <div class="text-white">CONTENT</div>
          </div>
        </div>
      </div>

      <div id="FOOTER" class="bg-blue-ovh-light py-5">
        <div class="container mx-auto px-5">
          <div class="flex flex-row justify-between">
            <div class="text-white font-light">OVHCloud © 2021</div>
            <a
              href="https://github.com/IMT-Atlantique-FIP2021/fiowebviewer-frontend"
              class="text-white font-light hover:underline flex group"
            >
              Source code available on
              <svg class="feather feather-github ml-2 opacity-80 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
