<template>
  <table class="shadow-md bg-white table-fixed w-full">
    <tr class="bg-ovh_blue text-white text-left border">
      <th class="w-10 text-center">
        <input type="checkbox" class="h-4 w-4" />
      </th>
      <th class="py-4 px-4 w-64">Job Name</th>
      <th class="py-4 px-4">Tags</th>
      <th class="py-4 w-32 text-center">Submitted at</th>
      <th class="py-4 w-32 text-center">Actions</th>
    </tr>

    <Line
      v-for="result in resultList"
      v-bind:key="result"
      v-bind:result="result"
    />

  </table>
</template>

<script>
import Line from "./Line.vue";

import Data from "../../assets/resultList.json";

export default {
  components: {
    Line,
  },
  data: function () {
    return {
      resultList: Data
    };
  },
};
</script>