<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import "../style.css";
console.log("article component");
const a = ref(0);

// onMounted(() => {
//   setInterval(() => a.value++, 1000);
// });

// watch(a, (n) => {
//   console.log("a: ", n);
// });
</script>

<template>
  <h1 class="text-5xl text-teal-400">This is article component</h1>
</template>
