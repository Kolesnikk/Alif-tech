<template>
  <nav class="navigation">
    <ul>
      <li v-for="link in links" :key="link.path">
        <router-link active-class="active" :to="{ name: link.path }">
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "side-bar",
  data() {
    return {
      links: [
        {
          name: "Home",
          path: "home",
        },
        {
          name: "Add post",
          path: "newPost",
        },
      ],
    };
  },
};
</script>

<style>
.navigation {
  width: 320px;
  background: rgb(145, 145, 145);
  min-height: 100vh;
  height: 100%;
}
</style>
