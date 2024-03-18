import { createApp } from "vue";
import Article from "./components/Article.vue";

export default function (el: string) {
  createApp(Article).mount(el);
}
