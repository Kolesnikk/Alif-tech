import axios from "axios";
import { sortDate } from "@/mixins/dataTime";
export default {
  namespaced: true,
  state: () => ({
    quotes: [],
    filteredQuotes: [],
    filteredSearchQuotes: [],
    filterGenre: "",
    searchValue: "",
    typeDate: "createAt",
    quote: null,
  }),
  mutations: {
    ADD_QUOTE(state, payload) {
      state.quotes.unshift(payload);
    },
    SET_QUOTES(state, payload) {
      state.quotes = payload;
    },
    SET_QUOTE(state, payload) {
      state.quote = payload;
    },
    REMOVE_QUOTE(state, payload) {
      state.quotes = state.quotes.filter((quote) => quote.id !== payload);
    },
    UPDATE_QUOTE(state, { id, body }) {
      state.quotes = state.quotes.map((quote) => {
        if (quote.id === id) {
          const updatedQuote = { ...quote };
          for (let key in body) {
            if (updatedQuote[key] !== body[key]) {
              updatedQuote[key] = body[key];
            }
          }
          return updatedQuote;
        }
        return quote;
      });
    },
    SET_FILTER_GENRE(state, payload) {
      // трабла с тем что state перезаписываем но когда сбрасываем, стейт теряется и чтоб снова получить все квоты надо обновить страницу РЕШЕНО
      state.filterGenre = payload;
      if (payload !== "") {
        state.filteredQuotes = state.quotes.filter((quote) =>
          quote.quoteGenre.includes(payload)
        );
      } else {
        state.filteredQuotes = state.quotes;
      }
    },
    SET_TYPE_DATE(state, payload) {
      state.typeDate = payload;
    },
    SET_SEARCH_VALUE(state, { value, type }) {
      state.searchValue = value;
      if (value !== "") {
        let res = state.quotes.filter((quote) =>
          quote[type].toLowerCase().includes(value.toLowerCase())
        );
        state.filteredSearchQuotes = res.sort((a, b) =>
          a[type].localeCompare(b[type], undefined, {
            sensitivity: "base",
            ignorePunctuation: true,
          })
        );
      } else {
        state.filteredSearchQuotes = state.quotes;
      }
    },
  },
  actions: {
    async createQuote({ commit }, payload) {
      try {
        const { data } = await axios.post(
          "https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes.json",
          payload
        );
        const res = { ...payload, id: data?.name };
        commit("ADD_QUOTE", res);
      } catch (e) {
        console.log(e);
      }
    },
    async getQuotes({ commit }) {
      try {
        const { data } = await axios.get(
          "https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes.json"
        );
        const res = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        commit("SET_QUOTES", res);
      } catch (e) {
        console.log(e);
      }
    },
    async getQuote({ commit }, id) {
      try {
        const { data } = await axios.get(
          `https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`
        );
        commit("SET_QUOTE", data);
      } catch (e) {
        console.log(e);
      }
    },
    async removeQuote(_, id) {
      try {
        await axios.delete(
          `https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`
        );
      } catch (e) {
        console.log(e);
      }
    },
    async updateQuote(_, { id, body }) {
      try {
        await axios.patch(
          `https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes/${id}.json`,
          body
        );
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    get_quotes: (state) => {
      let quotes = state.quotes;
      if (state.filterGenre !== "") {
        quotes = state.filteredQuotes;
      }
      if (state.searchValue !== "") {
        quotes = state.filteredSearchQuotes;
      }
      return sortDate(quotes, state.typeDate);
    },
    get_quote: (state) => state.quote,
    get_genres: (state) => {
      const genres = state.quotes.map((quote) => quote.quoteGenre);
      console.log(genres, "genres");
      return [...new Set(genres.flat())];
    },
  },
};

// state.quotes?.sort((a, b) => {
//   const dateA = new Date(a.createAt);
//   const dateB = new Date(b.createAt);
//   return dateB - dateA;
// })
