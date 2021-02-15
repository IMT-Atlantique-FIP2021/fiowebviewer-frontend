<template>
  <div class="flex flex-row">
    <!-- SIDEBAR -->
    <div class="flex flex-col flex-none h-screen w-64">
      <div
        class="h-12 flex-none bg-ovh_blue flex items-center justify-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-activity"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
        <span class="font-semibold text-2xl text-white pr-4">FIO Analyzer</span>
      </div>

      <!-- HEADER BREAK -->

      <div
        class="flex flex-col flex-auto bg-gray-300 dark:bg-gray-800 dark:text-white"
      >
        <div class="flex flex-col space-y-2">
          <div class="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
            OVERVIEW
          </div>
          <div
            class="group flex space-x-2 pl-4 items-center cursor-pointer text-blue-600"
          >
            <svg
              class="feather feather-list opacity-50 group-hover:opacity-100"
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
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <div>Job Browser</div>
          </div>

          <div class="group flex space-x-2 pl-4 items-center cursor-pointer">
            <svg
              class="feather feather-download opacity-50 group-hover:opacity-100"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <div>Download script</div>
          </div>
        </div>

        <!-- SECTION BREAK -->

        <div class="flex flex-col space-y-2">
          <div class="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
            LIST ACTION
          </div>
          <div class="group flex space-x-2 pl-4 items-center cursor-pointer">
            <svg
              class="feather feather-minimize-2 opacity-50 group-hover:opacity-100"
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
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </svg>
            <div>Compare selected</div>
          </div>

          <div class="group flex space-x-2 pl-4 items-center cursor-pointer">
            <svg
              class="feather feather-trash opacity-50 group-hover:opacity-100"
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
              <polyline points="3 6 5 6 21 6"></polyline>
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
              ></path>
            </svg>
            <div>Delete selected</div>
          </div>
        </div>

        <!-- SECTION BREAK -->

        <div class="flex flex-col space-y-2">
          <div class="font-medium text-sm opacity-60 px-3 pb-2 pt-8">
            INFORMATION
          </div>
          <div class="group flex space-x-2 pl-4 items-center cursor-pointer">
            <svg
              class="feather feather-book-open opacity-50 group-hover:opacity-100"
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            <div>Docs</div>
          </div>

          <div class="group flex space-x-2 pl-4 items-center cursor-pointer">
            <svg
              class="feather feather-info opacity-50 group-hover:opacity-100"
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div>About</div>
          </div>
        </div>

        <div class="flex-grow"></div>

        <div class="font-light text-sm text-center pb-4 pt-4 flex-none">
          OVHcloud © 2021
        </div>
      </div>
    </div>

    <!-- PAGE CONTENT -->
    <div class="flex flex-col w-screen">
      <div
        class="flex-none bg-blue-600 h-12 flex justify-end items-center pr-8"
      >
        <div class="flex flex-row text-white">
          <button class="hidden dark:visible">
            <svg
              class="feather feather-sun"
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
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          </button>
          <button class="visible dark:hidden">
            <svg
              class="feather feather-moon"
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
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-auto dark:bg-gray-600 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
