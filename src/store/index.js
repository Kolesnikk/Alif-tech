import { createStore, createLogger } from "vuex";
import quotes from "./modules/quotes";

export default createStore({
  plugins: [createLogger()],
  modules: {
    quotes,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
