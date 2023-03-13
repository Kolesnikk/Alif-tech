<template>
  <div class="container mt-5">
    <form @submit.prevent="submitQuote">
      <div class="form-group">
        <label>Текст цитаты:</label>
        <textarea class="form-control" v-model="quote.quoteText"></textarea>
      </div>

      <div class="form-group">
        <label>Автор цитаты:</label>
        <input class="form-control" type="text" v-model="quote.quoteAuthor" />
      </div>

      <div class="form-group">
        <label>Жанр цитаты:</label>
        <input class="form-control" type="text" v-model="quote.quoteGenre" />
      </div>

      <button type="submit" class="btn btn-primary">Отправить</button>
    </form>
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
        quoteGenre: "",
      },
    };
  },
  methods: {
    async submitQuote() {
      const { quoteText, quoteAuthor, quoteGenre } = this.quote;
      if (
        ![quoteText, quoteAuthor, quoteGenre].every((field) => field.trim())
      ) {
        console.log("Пожалуйста, заполните все поля");
        return;
      }
      this.quote.createAt = Date.now();
      this.quote.lastEdit = this.quote.createAt;
      const quoteData = JSON.stringify(this.quote);
      this.$store.dispatch("quotes/createQuote", quoteData);
      this.$router.push("/");
      this.quote = {};
    },
  },
};
</script>
