<template>
  <div class="container mt-5">
    <div class="form-wrapper">
      <form @submit.prevent="submitQuote" class="form">
        <div class="form_left">
          <div class="form-group">
            <label>Текст цитаты*</label>
            <textarea
              class="form-control"
              v-model="quote.quoteText"
              placeholder="Какой-то текст..."
            ></textarea>
          </div>
        </div>
        <div class="form_right">
          <div class="form-group">
            <label>Автор цитаты*</label>
            <input
              class="form-control"
              type="text"
              v-model="quote.quoteAuthor"
              placeholder="Какой-то автор..."
            />
          </div>
          <div class="form-group_checkbox">
            <p>Жанр*</p>
            <label class="checkbox">
              <input type="checkbox" name="example" v-model="genrePhilosophy" />
              <span class="checkbox__icon"></span>
              <span class="checkbox__label">Философия</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" name="example" v-model="genreMotivation" />
              <span class="checkbox__icon"></span>
              <span class="checkbox__label">Мотивация</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" name="example" v-model="genreComedy" />
              <span class="checkbox__icon"></span>
              <span class="checkbox__label">Комедия</span>
            </label>
          </div>
        </div>
        <button type="submit" class="btn">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-page",
  data() {
    return {
      quote: {
        quoteText: "",
        quoteAuthor: "",
        quoteGenre: [],
      },
      genreComedy: false,
      genrePhilosophy: false,
      genreMotivation: false,
    };
  },
  methods: {
    async submitQuote() {
      const { quoteText, quoteAuthor } = this.quote;
      const genre = [];
      const genreFlags = {
        genreComedy: "Комедия",
        genrePhilosophy: "Философия",
        genreMotivation: "Мотивация",
      };

      Object.entries(genreFlags).forEach(([flag, genreName]) => {
        if (this[flag]) {
          genre.push(genreName);
        }
      });

      if (genre.length === 0) {
        console.log("Пожалуйста, выберите хотя бы один жанр");
        return;
      }
      this.quote.quoteGenre = genre;

      if (![quoteText.trim(), quoteAuthor.trim()].every(Boolean)) {
        console.log("Пожалуйста, заполните все поля");
        return;
      }

      this.quote.createAt = new Date().getTime();
      this.quote.lastEdit = this.quote.createAt;
      this.$store.dispatch("quotes/createQuote", this.quote);
      this.$router.push("/");
      this.quote = {};
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";
.form-wrapper {
  border-radius: 10px;

  .form {
    display: flex;
    flex-wrap: wrap;

    label {
      color: $primary-color;
      font-weight: 600;
      font-size: 14px;
    }

    &_left {
      flex: 0 0 48%;
      .form-group {
        textarea {
          background: $dark-bg;
          border: none;
          color: $primary-color;
          height: 150px;

          &:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem $genre-color;
          }
        }
      }
    }
    &_right {
      flex: 0 0 48%;
      margin-left: 4%;

      .form-group {
        input {
          background: $dark-bg;
          border: none;
          color: $primary-color;

          &:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem $genre-color;
          }
        }
      }
      .form-group_checkbox {
        margin-top: 20px;
        p {
          color: $primary-color;
          font-weight: 600;
          font-size: 14px;
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
      }
    }
    button {
      flex: 0 0 100%;
      margin-top: 20px;
      background: $genre-color;
      border: none;
      color: #fff;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      &_left {
        flex: 0 0 100%;
      }
      &_right {
        flex: 0 0 100%;
        margin-left: 0;
      }
    }
  }
}
</style>
