<template>
  <div class="main">
    <div class="buttons">
      <div class="buttons_left">
        <router-link to="/" class="btn back">
          <ion-icon name="return-up-back-outline"></ion-icon>
        </router-link>
      </div>
      <div class="buttons_right">
        <button class="btn change" @click="openModel()">
          <ion-icon name="create-outline"></ion-icon>
        </button>
        <button class="btn delete" @click.prevent="remove">
          <ion-icon name="trash-outline"></ion-icon>
        </button>
      </div>
    </div>
    <ul class="params">
      <li class="params_row">
        <h1 class="params_title">Содержимое</h1>
        <p class="params_description">{{ quote?.quoteText }}</p>
      </li>
      <li class="params_row">
        <h1 class="params_title">Автор</h1>
        <p class="params_description">{{ quote?.quoteAuthor }}</p>
      </li>
      <li class="params_row">
        <h1 class="params_title">Жанр</h1>
        <p class="params_description">
          <span v-for="genre in quote?.quoteGenre" :key="genre.id">
            {{ genre }}
          </span>
        </p>
      </li>
      <li class="params_row">
        <h1 class="params_title">Создание</h1>
        <p class="params_description">{{ parseDate(quote?.createAt) }}</p>
      </li>
      <li class="params_row">
        <h1 class="params_title">Изменение</h1>
        <p class="params_description">{{ parseDate(quote?.lastEdit) }}</p>
      </li>
    </ul>
    <transition>
      <div class="editQuote_form" v-if="isActive">
        <div class="editQuote_form-header">
          <h1 class="editQuote_form-title">Редактирование цитаты</h1>
          <button class="btn close" @click="isActive = false">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
        <div class="editQuote_form-body">
          <div class="editQuote_form-left">
            <div class="editQuote_form-row">
              <label for="quoteText" class="editQuote_form-label">
                Содержимое
              </label>
              <textarea
                id="quoteText"
                class="editQuote_form-input"
                v-model="editForm.quoteText"
              ></textarea>
            </div>
          </div>
          <div class="editQuote_form-right">
            <div class="editQuote_form-row">
              <label for="quoteAuthor" class="editQuote_form-label">
                Автор
              </label>
              <input
                id="quoteAuthor"
                class="editQuote_form-input"
                v-model="editForm.quoteAuthor"
              />
            </div>
            <div class="editQuote_form-row">
              <div class="checkBox">
                <p>Жанр</p>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    v-model="editForm.quoteGenre"
                    value="Философия"
                  />
                  <span class="checkbox__icon"></span>
                  <span class="checkbox__label">Философия</span>
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    v-model="editForm.quoteGenre"
                    value="Мотивация"
                  />
                  <span class="checkbox__icon"></span>
                  <span class="checkbox__label">Мотивация</span>
                </label>
                <label class="checkbox">
                  <input
                    type="checkbox"
                    v-model="editForm.quoteGenre"
                    value="Комедия"
                  />
                  <span class="checkbox__icon"></span>
                  <span class="checkbox__label">Комедия</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="editQuote_form-footer">
          <button class="btn save" @click="updateQuote()">
            Изменить цитату
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import dataTime from "@/mixins/dataTime.js";
export default {
  name: "quote-one",
  mixins: [dataTime],
  data() {
    return {
      isActive: false,
      editForm: {
        quoteText: "",
        quoteAuthor: "",
        quoteGenre: [],
      },
    };
  },
  computed: {
    quoteId() {
      return this.$route.params.id;
    },
    quote() {
      return this.$store.getters["quotes/get_quote"];
    },
  },
  methods: {
    async remove() {
      this.$store.commit("quotes/REMOVE_QUOTE", this.quoteId);
      this.$router.push("/");
      await this.$store.dispatch("quotes/removeQuote", this.quoteId);
    },
    async updateQuote() {
      this.editForm.lastEdit = new Date().getTime();
      this.$store.commit("quotes/SET_QUOTE", this.editForm);
      this.$store.commit("quotes/UPDATE_QUOTE", {
        id: this.quoteId,
        body: this.editForm,
      });
      await this.$store.dispatch("quotes/updateQuote", {
        id: this.quoteId,
        body: this.editForm,
      });
      this.isActive = false;
    },
    openModel() {
      this.editForm = JSON.parse(JSON.stringify(this.quote));
      this.isActive = true;
    },
  },
  mounted() {
    this.$store.dispatch("quotes/getQuote", this.quoteId);
  },
  unmounted() {
    this.$store.commit("quotes/SET_QUOTE", {});
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";
.main {
  padding-bottom: 40px;
  color: white;

  .params {
    list-style: none;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    border-radius: 16px;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.35);

    .params_row {
      flex: 0 0 100%;
      display: flex;
      align-items: center;

      &:hover {
        background-color: $light-bg;
      }
      &:hover .params_title {
        border-right: solid 1px $dark-bg;
      }

      &:not(:last-child) {
        border-bottom: solid 1px $light-bg;
      }

      .params_title {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 170px;
        height: 100%;
        font-size: 18px;
        font-weight: 600;
        padding: 20px;
        margin-bottom: 0;
        color: $genre-color;
        border-right: solid 1px $light-bg;
      }

      .params_description {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 0;
        padding: 20px;

        span {
          display: inline-block;
          margin-right: 20px;
        }
      }
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;

    .btn {
      flex: 0 0 48%;
      color: #fff;
      font-size: 25px;

      &.back:hover {
        color: $link-color;
      }
      &.change:hover {
        color: rgb(26, 133, 26);
      }
      &.delete:hover {
        color: rgb(216, 19, 19);
      }
    }
  }

  .editQuote_form {
    margin-top: 20px;
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: $dark-bg;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;

      .editQuote_form-title {
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 0;
        color: $genre-color;
      }

      .btn {
        color: #fff;
        font-size: 25px;

        &.close:hover {
          color: rgb(216, 19, 19);
        }
      }
    }

    &-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: $light-bg;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;

      @media (max-width: 768px) {
        flex-wrap: wrap;
      }

      .editQuote_form-left {
        flex: 0 0 70%;
        padding-right: 20px;

        label {
          color: $genre-color;
          font-weight: 600;
        }

        .editQuote_form-input {
          width: 100%;
          border-radius: 8px;
          min-height: 150px;
          padding: 10px;
          font-size: 18px;
          background: $dark-bg;
          color: $primary-color;
        }

        @media (max-width: 768px) {
          flex: 0 0 100%;
          padding-right: 0;
        }
      }

      .editQuote_form-right {
        flex: 0 0 30%;
        padding-left: 20px;

        .editQuote_form-row {
          margin-bottom: 20px;

          .editQuote_form-label {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 0;
            color: $genre-color;
            margin-bottom: 10px;
          }

          .editQuote_form-input {
            width: 100%;
            border-radius: 8px;
            padding: 10px;
            font-size: 18px;
            background: $dark-bg;
            color: $primary-color;
          }
        }
        p {
          font-weight: 600;
          color: $genre-color;
        }

        .checkbox {
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 16px;

          &__icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 10px;
            border: 2px solid #bbb;
            border-radius: 3px;
            transition: background-color 0.3s;

            &:after {
              content: "";
              display: block;
              width: 10px;
              height: 10px;
              margin: 3px;
              background-color: #fff;
              border-radius: 2px;
              transition: transform 0.3s;
              transform: scale(0);
            }
          }
          &__label {
            flex: 1;
          }
          &:hover {
            &__icon {
              border-color: #999;
            }
          }
          input[type="checkbox"] {
            display: none;

            &:checked + .checkbox__icon {
              background-color: $genre-color;
              border-color: $genre-color;
              &:after {
                transform: scale(1);
              }
            }
          }
        }

        @media (max-width: 768px) {
          flex: 0 0 100%;
          padding-right: 0;
          padding-left: 0;
          margin-top: 10px;
        }
      }
    }

    &-footer {
      .btn.save {
        width: 100%;
        background-color: $genre-color;
        border-radius: 8px;
        margin-top: 20px;
        color: #fff;
        font-weight: 600;
      }
    }
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
