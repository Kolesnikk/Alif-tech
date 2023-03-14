<template>
  <div class="search"></div>

  <section class="quotes">
    <div class="quotes_card" v-for="quote in quotes" :key="quote.id">
      <div class="quotes_card-options">
        <router-link :to="`/${quote.id}`" class="btn">
          <ion-icon name="open-outline" size="medium"></ion-icon>
        </router-link>
        <button class="btn" @click.prevent="remove(quote.id)">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
      <p class="quotes_card-text">{{ quote.quoteText }}</p>
      <span class="quotes_card-genre">{{ quote.quoteGenre }}</span>
      <div class="quotes_card-footer">
        <p class="quotes_card-footer-author">
          <i>
            {{ quote.quoteAuthor }}
          </i>
        </p>
        <p class="quotes_card-footer-date">{{ parseDate(quote.createAt) }}</p>
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
    parseDate() {
      return (code) => new Date(code).toLocaleDateString();
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

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.quotes {
  &_card {
    position: relative;
    width: 100%;
    background-color: $light-bg;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.35);
    margin-bottom: 20px;

    &-text {
      font-size: 20px;
      line-height: 30px;
      color: $primary-color;
    }

    &-options {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 10px;
      margin-top: -5px;

      a {
        ion-icon {
          font-size: 24px;
          color: $primary-color;
          transition: 0.1s ease-in-out;

          &:hover {
            color: $link-color;
          }
        }
      }
      button {
        ion-icon {
          font-size: 24px;
          color: $primary-color;
          transition: 0.1s ease-in-out;

          &:hover {
            color: #e63c30;
          }
        }
      }
    }

    &-genre {
      font-size: 16px;
      display: inline-block;
      background-color: $genre-color;
      text-transform: capitalize;
      position: absolute;
      top: 20px;
      left: 20px;
      border-radius: 3px;
      padding: 5px 10px;
      color: #fff;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40px;

      &-author {
        font-size: 18px;
        font-weight: 600;
        color: $primary-color;
      }

      &-date {
        font-size: 16px;
        color: $primary-color;
        opacity: 0.7;
        font-size: 14px;
      }
    }
  }
}
</style>
