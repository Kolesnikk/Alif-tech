<template>
  <div class="main">
    <p>{{ quote?.quoteText }}</p>
    <p>{{ quote?.quoteAuthor }}</p>
    <p>{{ quote?.quoteGenre }}</p>
    <p>last edit : {{ parseDate(quote?.lastEdit) }}</p>
    <p>created : {{ parseDate(quote?.createAt) }}</p>
    <button class="btn btn-danger" @click.prevent="remove($route.params.id)">
      Удалить
    </button>
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
export default {
  name: "quote-one",
  data() {
    return {
      isActive: false,
      editForm: {
        quoteId: this.id,
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
    parseDate() {
      return (code) => new Date(code).toLocaleDateString();
    },
    quote() {
      return this.$store.getters["quotes/get_quote"];
    },
  },
  methods: {
    async remove(id) {
      await this.$store.dispatch("quotes/removeQuote", id);
      await this.$router.push("/");
    },
    async updateQuote() {
      await this.$store.dispatch("quotes/updateQuote", this.editForm);
      await this.$router.push("/");
    },
    openModel() {
      this.editForm = JSON.parse(JSON.stringify(this.quote));
      this.isActive = true;
    },
  },
  mounted() {
    this.$store.dispatch("quotes/getQuote", this.quoteId);
  },
};
</script>

<style>
.popUp {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
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