<template>
  <div class="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: tada</div>
    <div>Framework: vue3</div>
    <Article />
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
// import "http://localhost:3000/main.css";

const Article = defineAsyncComponent(() => import("home/Article"));
</script>
