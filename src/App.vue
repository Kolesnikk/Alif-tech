<template>
  <sidebar></sidebar>
  <router-view />
</template>
<script>
import sidebar from "@/components/sidebar.vue";
export default {
  components: {
    sidebar,
  },
};
</script>
<style lang="scss">
#app {
  display: flex;
}
</style>
