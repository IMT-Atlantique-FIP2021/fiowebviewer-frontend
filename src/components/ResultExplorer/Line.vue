<template>
  <tr>
    <td class="border py-2 text-center">
      <input type="checkbox" class="h-4 w-4" />
    </td>
    <td class="border px-4 text-left truncate">{{ result.name }}</td>
    <td class="border px-4">
      <div
        class="flex flex-row justify-start space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-ovh_blue scrollbar-track-gray-200"
      >
        <Tag v-for="tag in result.tags" v-bind:key="tag" :text="tag" />
      </div>
    </td>
    <td class="border px-4 text-xs">{{ result.submitted_at }}</td>
    <td class="border px-4">
      <div class="flex flex-row justify-evenly">
        <button class="text-red-500">
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
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </button>
        <button class="text-blue-500">
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
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import Tag from "./Tag.vue";

export default {
  components: {
    Tag,
  },
  props: ["result"],
};
</script>