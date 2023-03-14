<template>
  <div class="container">
    <Header></Header>
    <router-view />
  </div>
</template>
<script>
import Header from "@/components/header";
export default {
  components: {
    Header,
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";
#app {
  background: $main-bg;
  min-height: 100vh;
}
</style>
