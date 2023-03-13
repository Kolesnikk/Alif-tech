import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/home";
import newPost from "@/views/createPost";

const routes = [
  {
    name: "home",
    path: "/",
    component: home,
  },
  {
    name: "newPost",
    path: "/new-post",
    component: newPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
