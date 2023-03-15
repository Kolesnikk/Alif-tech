<template>
  <div class="main">
    <p>{{ quote?.quoteText }}</p>
    <p>{{ quote?.quoteAuthor }}</p>
    <p>{{ quote?.quoteGenre }}</p>
    <p>last edit : {{ parseDate(quote?.lastEdit) }}</p>
    <p>created : {{ parseDate(quote?.createAt) }}</p>
    <button class="btn btn-danger" @click.prevent="remove">Удалить</button>
    <button class="btn btn-warning" @click="openModel()">Изменить</button>
    <div class="popUp_wrapper">
      <div class="popUp" v-if="isActive">
        <div class="popUp__body">
          <div class="popUp__content">
            <div class="popUp__header">
              <h3 class="popUp__title">Изменить цитату</h3>
              <button class="popUp__close" @click="isActive = false">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="popUp__main">
              <form class="form" @submit.prevent="updateQuote()">
                <div class="form__group">
                  <label class="form__label" for="quoteText">Цитата</label>
                  <textarea
                    class="form__input"
                    id="quoteText"
                    v-model="editForm.quoteText"
                  ></textarea>
                </div>
                <div class="form__group">
                  <label class="form__label" for="quoteAuthor">Автор</label>
                  <input
                    class="form__input"
                    id="quoteAuthor"
                    v-model="editForm.quoteAuthor"
                  />
                </div>
                <div class="form__group">
                  <label class="form__label" for="quoteGenre">Жанр</label>
                  <input
                    class="form__input"
                    id="quoteGenre"
                    v-model="editForm.quoteGenre"
                  />
                </div>
                <div class="form__group">
                  <button class="btn btn-primary" type="submit">
                    Изменить
                  </button>
                  <button
                    class="btn btn-primary"
                    type="submit"
                    @click.prevent.esc="isActive = false"
                  >
                    Закрыть
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow" v-if="isActive"></div>
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
        quoteGenre: "",
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
      // this.$router.push("/");
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
.main {
  color: white;
}
.popUp {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 16px;
  z-index: 1;
}
.overflow {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
