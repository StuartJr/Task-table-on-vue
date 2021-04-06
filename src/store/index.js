import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasklist: JSON.parse(localStorage.getItem("tasks") || "[]"),
  },
  mutations: {
    ADD_ITEM_IN_LIST: (state, task) => {
      state.tasklist.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasklist));
    },
    DELETE_ITEM_IN_LIST: (state, index) => {
      state.tasklist.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(state.tasklist));
    },
  },
  actions: {
    ADD_ITEM_IN_LIST_ACTIONS({ commit }, task) {
      commit("ADD_ITEM_IN_LIST", task);
    },
    DELETE_ITEM_IN_LIST_ACTIONS({ commit }, index) {
      commit("DELETE_ITEM_IN_LIST", index);
    },
  },
  getters: {
    TASK_LIST(state) {
      return state.tasklist;
    },
  },
  modules: {},
});
