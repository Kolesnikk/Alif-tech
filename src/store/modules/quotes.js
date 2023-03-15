import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    quotes: [],
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
    get_quotes: (state) =>
      state.quotes?.sort((a, b) => {
        const dateA = new Date(a.createAt);
        const dateB = new Date(b.createAt);
        return dateB - dateA;
      }),
    get_quote: (state) => state.quote,
  },
};
