import axios from "axios";

export default {
  namespaced: true,
  state: () => ({
    quotes: null,
  }),
  mutations: {
    SET_QUOTES(state, payload) {
      state.quotes = payload;
      console.log(state.quotes, "state.quotes");
    },
  },
  actions: {
    async getQuotes({ commit }) {
      try {
        const { data } = await axios.get(
          "https://aliftech-bcdc3-default-rtdb.europe-west1.firebasedatabase.app/quotes.json"
        );
        console.log(data);
        commit("SET_QUOTES", data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    get_quotes: (state) => state.quotes,
  },
};
