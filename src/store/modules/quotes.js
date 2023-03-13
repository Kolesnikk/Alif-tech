import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    quotes: null,
    quote: null,
  }),
  mutations: {
    SET_QUOTES(state, payload) {
      state.quotes = payload;
      console.log(state.quotes, "state.quotes");
    },
    SET_QUOTE(state, payload) {
      state.quote = payload;
    },
    REMOVE_QUOTE(state, payload) {
      state.quotes = state.quotes.filter((quote) => quote.id !== payload);
    },
  },
  actions: {
    async createQuote(_, payload) {
      try {
        await axios.post(
          "https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes.json",
          payload
        );
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
        // eslint-disable-next-line no-undef
      } catch (e) {
        console.log(e);
      }
    },
    async updateQuote(_, payload) {
      try {
        await axios.put(
          `https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes/${payload.id}.json`,
          payload
        );
        console.log(payload);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    get_quotes: (state) => state.quotes?.reverse(),
    get_quote: (state) => state.quote,
  },
};
