import { createRouter, createWebHistory } from "vue-router";
import quotes from "@/views/quotes";
import createPost from "@/views/quotes/create.vue";
// import qoute from "@/views/quote.vue";
const qoute = () => import("@/views/quotes/quote.vue");

const routes = [
  {
    name: "home",
    path: "/",
    component: quotes,
  },
  {
    path: "/:id",
    component: qoute,
    name: "quote",
  },
  {
    name: "newPost",
    path: "/new-post",
    component: createPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
