<template>
  <div class="searchBar">
    <div class="searchBar-input">
      <input type="text" placeholder="Search" v-model="searchValue" />
      <ion-icon name="search-outline"></ion-icon>
    </div>
    <div class="searchBar-filters">
      <div class="radio-group">
        <input type="radio" id="radio1" name="radio-group" />
        <label for="radio1">Автор</label>

        <input type="radio" id="radio2" name="radio-group" />
        <label for="radio2">Текст</label>

        <input type="radio" id="radio3" name="radio-group" />
        <label for="radio3">Жанр</label>
      </div>
    </div>
  </div>

  <section class="quotes">
    <div class="quotes_card" v-for="quote in quotes" :key="quote.id">
      <div class="quotes_card-header">
        <div class="genre">
          <span
            class="quotes_card-genre"
            v-for="genre in quote?.quoteGenre"
            :key="genre.id"
          >
            {{ genre }}
          </span>
        </div>
        <div class="quotes_card-options">
          <router-link :to="`/${quote.id}`" class="btn">
            <ion-icon name="open-outline" size="medium"></ion-icon>
          </router-link>
          <button class="btn delete" @click.prevent="remove(quote.id)">
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      </div>
      <p class="quotes_card-text">{{ quote?.quoteText }}</p>
      <div class="quotes_card-footer">
        <p class="quotes_card-footer-author">
          <i>
            {{ quote?.quoteAuthor }}
          </i>
        </p>
        <p class="quotes_card-footer-date">
          {{ parseDate(quote?.createAt) }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import dataTime from "@/mixins/dataTime.js";
export default {
  name: "home-page",
  mixins: [dataTime],
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
    if (this.$store.getters["quotes/get_quotes"].length === 0) {
      await this.getQuotes();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.searchBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  &-input {
    display: flex;
    align-items: center;
    width: 50%;
    background-color: $light-bg;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.35);

    input {
      width: 100%;
      border: none;
      outline: none;
      background-color: transparent;
      font-size: 18px;
      color: $primary-color;
      margin-right: 10px;
    }

    ion-icon {
      font-size: 20px;
      color: $primary-color;
    }
  }

  &-filters {
    display: flex;
    align-items: center;
    width: 50%;
    height: 41px;

    .radio-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      input[type="radio"] {
        display: none;

        &:checked + label {
          color: #fff;
          background: $genre-color;
        }
      }

      label {
        display: inline-block;
        padding: 5px;
        margin: 0 5px;
        font-size: 14px;
        color: $genre-color;
        cursor: pointer;
        border: 1px solid $genre-color;
        border-radius: 5px;

        &:hover {
          background: $genre-color;
          color: #fff;
        }
      }
    }
  }
}
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

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .genre {
        font-size: 14px;
        color: $primary-color;
        font-weight: 600;
        margin-right: 10px;

        .quotes_card-genre {
          margin-right: 10px;
          text-transform: capitalize;
          color: #fff;
          background-color: $genre-color;
          padding: 5px 10px;
          border-radius: 8px;
        }
      }

      .quotes_card-options {
        display: flex;
        align-items: center;
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: transparent;
          border: none;
          cursor: pointer;
          margin-right: 10px;
          color: $primary-color;
          font-size: 20px;
          transition: 0.3s;

          &:hover {
            color: $link-color;
          }
          &.delete:hover {
            color: rgb(216, 19, 19);
          }
        }
      }
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
