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
//import firebase from "firebase/app";
//import "firebase/database";
import axios from "axios";

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
      if (
        this.quote.quoteText.trim() === "" &&
        this.quote.quoteAuthor.trim() === "" &&
        this.quote.quoteGenre.trim() === ""
      ) {
        console.log("Пожалуйста, заполните все поля");
        return;
      }
      try {
        this.quote.createAt = Date.now();
        this.quote.lastEdit = this.quote.createAt;
        const quoteData = JSON.stringify(this.quote);
        console.log(`Данные цитаты: ${quoteData}`);
        await axios.post(
          "https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes.json",
          quoteData
        );
        this.quote = {};
      } catch (e) {
        console.log(e);
      }

      // Здесь мы отправляем данные на сервер Firebase
      //const database = firebase.database();
      //const newQuoteRef = database.ref("quotes").push();
      //newQuoteRef
      //  .set(this.quote)
      //  .then(() => {
      //    console.log("Цитата успешно отправлена на сервер Firebase");
      //  })
      //  .catch((error) => {
      //    console.error("Ошибка отправки цитаты на сервер Firebase:", error);
      //  });
    },
  },
};
</script>
