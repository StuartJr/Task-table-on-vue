<template>
  <div class="task">
    <div class="task__wrapper">
      <h1>Change task</h1>
      <div class="task__form">
        <div class="task__form-field">
          <p class="task__form-field-label">Name</p>
          <input
            v-model="item.name"
            type="text"
            class="task__form-field-input"
            :disabled="disabled == 1"
          />
        </div>
        <div class="task__form-field">
          <div class="task__form-field-create">
            <p class="task__form-field-label">Affairs</p>
            <input
              :disabled="disabled == 1"
              v-on:keyup.enter="createListItem()"
              placeholder="Affairs"
              v-model="task"
              type="text"
              class="task__form-field-input"
            />
          </div>
          <div class="task__form-field-list">
            <div
              v-show="item.affairs.length >= 1"
              class="task__form-field-list-item"
              v-for="(task, index) in item.affairs"
              :key="index"
            >
              <p class="task__form-field-list-text">{{ task }}</p>
              <span
                @click="deleteAffairs(index)"
                class="task__form-field-list-close"
                :class="{ active: item.status == 'Complete' }"
              ></span>
            </div>
          </div>
        </div>
        <div class="task__form-field">
          <p class="task__form-field-label">Discription</p>
          <textarea
            v-model="item.description"
            placeholder="Discription"
            class="task__form-field-textarea"
            :disabled="disabled == 1"
          ></textarea>
        </div>
        <div class="task__form-field">
          <p
            class="task__form-field-btn task__form-field-btn_red"
            @click="deleteTaskComplite()"
          >
            Delete
          </p>
          <p
            class="task__form-field-btn task__form-field-btn_blue"
            :class="{ active: item.status == 'Complete' }"
            @click="comlpleteTask(item.id)"
          >
            Сomplete
          </p>
          <p
            class="task__form-field-btn task__form-field-btn_blue"
            @click="updateTask()"
            :class="{ active: item.status == 'Complete' }"
          >
            Save
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      task: "",
      indexItem: null,
      disabled: 0,
    };
  },
  methods: {
    ...mapActions([
      "DELETE_ITEM_IN_LIST_ACTIONS",
      "UPDATE_ITEM_IN_LIST_ACTIONS",
      "COMPLETE_ITEM_IN_LIST_ACTIONS",
    ]),
    createListItem() {
      if (this.task.length >= 3) {
        this.item.affairs.push(this.task);
        this.task = "";
      }
    },
    deleteAffairs(index) {
      if (this.item.status == "active") {
        this.item.affairs.splice(index, 1);
      }
    },
    deleteTaskComplite() {
      this.DELETE_ITEM_IN_LIST_ACTIONS(this.indexItem);
      this.$router.push("/");
    },
    updateTask() {
      if (this.item.status == "active") {
        this.UPDATE_ITEM_IN_LIST_ACTIONS(this.item.id);
        this.$router.push("/");
      }
    },
    comlpleteTask(id) {
      this.COMPLETE_ITEM_IN_LIST_ACTIONS(id);
      if (this.item.status == "Complete") {
        this.disabled = 1;
      }
    },
  },
  computed: {
    ...mapGetters(["TASK_ID", "TASK_LIST"]),
    item() {
      return this.TASK_ID(+this.$route.params.id); //Возврашает параметр
    },
  },
  mounted() {
    let index = this.TASK_LIST.findIndex(
      (el) => el.id === +this.$route.params.id
    );
    this.indexItem = index;
    if (this.item.status == "Complete") {
      this.disabled = 1;
    }
  },
};
</script>
<style lang="scss" scoped>
.task {
  &__wrapper {
    padding: 60px 0px;
  }
  &__form-field {
    max-width: 600px;
    margin: 0 auto;
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
      display: flex;
      justify-content: flex-end;
    }
  }
  &__form-field-label {
    margin-bottom: 10px;
    font-size: 18px;
    line-height: 22px;
    color: #a6a4a4;
  }
  &__form-field-input,
  &__form-field-textarea {
    width: 100%;
    padding: 10px 6px;
    border-radius: 8px;
    border: 1px solid #a6a4a4;
    color: #010101;
    font-size: 20px;
    line-height: 24px;
    &:placeholder {
      color: #a6a4a4;
    }
  }
  &__form-field-textarea {
    resize: none;
    height: 200px;
  }
  &__form-field-list {
    display: flex;
    flex-wrap: wrap;
  }
  &__form-field-list-item {
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    background-color: #6fb6f7;
    border-radius: 10px;
    margin-right: 5px;
    position: relative;
  }
  &__form-field-list-text {
    color: #ffffff;
    font-size: 20px;
    line-height: 22px;
  }
  &__form-field-list-close {
    cursor: pointer;
    width: 15px;
    height: 15px;
    position: relative;
    margin-left: 8px;
    &.active {
      cursor: default;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0px;
      top: 6px;
      width: 15px;
      height: 2px;
      background-color: #ffffff;
      transform: rotate(-45deg);
      border-radius: 4px;
    }
    &:before {
      content: "";
      position: absolute;
      right: 0;
      top: 6px;
      width: 15px;
      height: 2px;
      background-color: #ffffff;
      transform: rotate(45deg);
      border-radius: 4px;
    }
  }
  &__form-field-btn {
    margin-right: 20px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    color: #ffffff;
    font-size: 20px;
    line-height: 22px;
    &.active {
      background-color: #a6a4a4;
      cursor: default;
    }
    &:last-child {
      margin-right: 0;
    }
    &_red {
      background-color: #ff2929;
    }
    &_blue {
      background-color: #6fb6f7;
    }
  }
}
</style>
