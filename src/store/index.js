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
    UPDATE_ITEM_IN_LIST: (state, id) => {
      const taskList = state.tasklist.concat(); //создаём дубликат листа задач
      const indexItem = state.tasklist.findIndex((el) => el.id === id); //находим index нужной задачи
      const task = taskList[indexItem];

      taskList[indexItem] = task; //обновляем задачу
      state.tasklist = taskList; //обновляем список
      localStorage.setItem("tasks", JSON.stringify(state.tasklist));
    },
    COMPLETE_ITEM_IN_LIST: (state, id) => {
      const indexItem = state.tasklist.findIndex((el) => el.id === id);
      state.tasklist[indexItem].status = "Complete";
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
    UPDATE_ITEM_IN_LIST_ACTIONS({ commit }, id) {
      commit("UPDATE_ITEM_IN_LIST", id);
    },
    COMPLETE_ITEM_IN_LIST_ACTIONS({ commit }, id) {
      commit("COMPLETE_ITEM_IN_LIST", id);
    },
  },
  getters: {
    TASK_LIST(state) {
      return state.tasklist;
    },
    TASK_ID(state) {
      return (id) => {
        //Принимаемый параметр(id задачи)
        return state.tasklist.find((task) => task.id === id); //Возвращает лист всех задач и через find(по типу for(of) элемент, id этого элемента равный id получаемого id)
      };
    },
  },
  modules: {},
});
