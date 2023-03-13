<template>
  <div class="search"></div>

  <section class="posts">
    <div class="posts__post" v-for="post in quotes" :key="post.id">
      <!-- <p>{{ post.text }}</p>
      <p>{{ post.author }}</p> -->
      <pre>{{ post }}</pre>
      <button>like</button>
    </div>
    {{ quotes }}
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "home-page",
  // data() {
  //   return {
  //     posts: [
  //       {
  //         id: 0,
  //         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam quisquam perferendis porro fuga ipsam, nostrum labore possimus illo deserunt.",
  //         author: "Ramir",
  //         like: false,
  //       },
  //       {
  //         id: 1,
  //         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam quisquam perferendis porro fuga ipsam, nostrum labore possimus illo deserunt.",
  //         author: "Ramir",
  //         like: false,
  //       },
  //       {
  //         id: 2,
  //         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia numquam quisquam perferendis porro fuga ipsam, nostrum labore possimus illo deserunt.",
  //         author: "Ramir",
  //         like: false,
  //       },
  //     ],
  //   };
  // },
  computed: {
    quotes(){
      return this.$store.getters['quotes/get_quotes']
    },
    // ...mapGetters("quotes", ["get_quotes"]),
  },
  methods: {
    ...mapActions("quotes", ["getQuotes"]),
  },
  async mounted() {
    await this.getQuotes();
  },
};
</script>

<style></style>
