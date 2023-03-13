<template>
  <div class="search"></div>

  <section class="posts">
    <div class="card" v-for="quote in quotes" :key="quote.id">
      <div class="card-body">
        <p class="card-text">{{ quote.quoteText }}</p>
        <router-link :to="`/${quote.id}`" class="btn btn-primary"
          >Открыть</router-link
        >
        <button class="btn btn-danger" @click.prevent="remove(quote.id)">
          Удалить
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "home-page",
  computed: {
    quotes() {
      return this.$store.getters["quotes/get_quotes"];
    },
  },
  methods: {
    ...mapActions("quotes", ["getQuotes", "removeQuote"]),
    remove(id) {
      this.removeQuote(id);
      this.$store.commit("quotes/REMOVE_QUOTE", id);
    },
  },
  async mounted() {
    await this.getQuotes();
  },
};
</script>

<style lang="scss"></style>
