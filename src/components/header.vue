<template>
  <nav class="navigation">
    <ul class="navigation_list">
      <li v-for="link in links" :key="link.path">
        <router-link
          active-class="active"
          :to="{ name: link.path }"
          class="navigation_list-link"
        >
          {{ link.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "header-component",
  data() {
    return {
      links: [
        {
          name: "Home",
          path: "home",
        },
        {
          name: "Create",
          path: "newPost",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.navigation {
  width: 100%;
  padding: 50px 0;
  display: flex;
  justify-content: center;

  &_list {
    width: 150px;
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0;

    &-link {
      color: $primary-color;
      position: relative;
      text-transform: uppercase;
      transition: 0.2s;
      font-weight: 600;

      &.active::before {
        content: "";
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        left: 50%;
        transform: translateX(-50%);
        bottom: -7px;
        border-radius: 50%;
        background: $genre-color;
      }

      &:hover {
        color: $genre-color;
      }

      &.active {
        color: $genre-color;
      }
    }

    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 1px;
      height: 100%;
      left: 47%;
      transform: translateX(-50%);
      background: #fff;
    }
  }
}
</style>
