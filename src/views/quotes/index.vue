<template>
  <div class="searchBar">
    <div class="searchBar-input">
      <input type="text" placeholder="Search" v-model="searchValue" />
      <ion-icon name="search-outline"></ion-icon>
    </div>
    <div class="searchBar-filters">
      <div class="radio-group">
        <input
          type="radio"
          id="radio1"
          name="radio-group"
          v-model="searchType"
          value="quoteAuthor"
        />
        <label for="radio1">Автор</label>

        <input
          type="radio"
          id="radio2"
          name="radio-group"
          v-model="searchType"
          value="quoteText"
        />
        <label for="radio2">Текст</label>
      </div>
    </div>
    <div class="filters">
      <div>
        <label>{{ filter_genre }}</label>
        <select v-model="filter_genre">
          <option value="" selected>
            {{ filter_genre === "" ? "Выберите жанр" : "Сбросить" }}
          </option>
          <option v-for="(genre, idx) in genres" :key="idx" :value="genre">
            {{ genre }}
          </option>
        </select>
      </div>
      <div>
        <label></label>
        <select v-model="sort_date">
          <option v-for="(type, idx) in dataArr" :key="idx" :value="type">
            {{ type === "createAt" ? "Дата создания" : "Дата изменения" }}
          </option>
        </select>
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
        <div>
          <p class="quotes_card-footer-date">
            create at: {{ parseDate(quote?.createAt) }}
          </p>
          <p class="quotes_card-footer-date">
            last edit: {{ parseDate(quote?.lastEdit) }}
          </p>
        </div>
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
  data() {
    return {
      searchValue: "",
      searchType: "quoteAuthor",
      filter_genre: "",
      sort_date: "createAt",
      dataArr: ["createAt", "lastEdit"],
    };
  },
  computed: {
    quotes() {
      return this.$store.getters["quotes/get_quotes"];
    },
    genres() {
      return this.$store.getters["quotes/get_genres"];
    },
  },
  watch: {
    searchValue(value) {
      this.$store.commit("quotes/SET_SEARCH_VALUE", {
        value,
        type: this.searchType,
      });
    },
    filter_genre(value) {
      if (this.filter_genre !== "") {
        this.$store.commit("quotes/SET_FILTER_GENRE", value);
      } else {
        this.$store.commit("quotes/SET_FILTER_GENRE", "");
      }
    },
    sort_date(value) {
      this.$store.commit("quotes/SET_TYPE_DATE", value);
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

  .filters {
    display: flex;
    flex: 0 0 33%;
    justify-content: space-between;
    align-items: center;

    div {
      display: flex;
      align-items: center;

      select {
        padding: 0.5rem;
        border-radius: 0.25rem;
        font-size: 1rem;
        background-color: $genre-color;
        color: #fff;
        margin-left: 20px;

        option {
          color: #fff;
          background-color: $genre-color;
        }

        @media (max-width: 480px) {
          margin-right: 10px;
          margin-left: 0;
        }
      }
    }
  }

  &-input {
    display: flex;
    align-items: center;
    flex: 0 0 33%;
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
    flex: 0 0 15%;
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

  @media (max-width: 768px) {
    flex-wrap: wrap;
    .searchBar-input {
      flex: 0 0 100%;
      margin-bottom: 20px;
    }
    .searchBar-filter {
      flex: 0 0 48%;
    }
    .filters {
      flex: 0 0 48%;
    }
  }

  @media (max-width: 480px) {
    .searchBar-filter {
      flex: 0 0 100%;
    }
    .filters {
      select {
        margin-left: 0;
      }
    }

    .searchBar-input {
      margin-bottom: 10px;
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

          @media (max-width: 480px) {
            padding: 5px;
            font-weight: 400;
            font-size: 12px;
          }
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
        color: $primary-color;
        opacity: 0.7;
        font-size: 14px;

        @media (max-width: 480px) {
          font-size: 12px;
          margin-bottom: 10px;
        }
      }
    }

    @media (max-width: 768px) {
      .quotes_card-options {
        .btn {
          font-size: 18px;
        }
      }
    }
  }
}
.filters {
  color: #fff;
}
</style>
