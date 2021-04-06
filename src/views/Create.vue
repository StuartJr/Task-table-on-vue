<template>
  <div class="create">
    <div class="create__wrapper">
      <h1 class="create__title">Create</h1>
      <div class="form">
        <div class="form__field">
          <p class="form__label">Name</p>
          <input
            v-model="name"
            placeholder="Name"
            type="text"
            class="form__input"
          />
          <p id="name" class="form__field-error">
            This field must be filled in (minimum number of characters 3)
          </p>
        </div>
        <div class="form__field">
          <div class="form__field-input">
            <p for="list" class="form__label">
              You checklist (press the enter)
            </p>
            <input
              v-model="item"
              v-on:keyup.enter="createListItem()"
              placeholder="Item"
              type="text"
              class="form__input"
            />
            <p id="item" class="form__field-error">
              There must be at least 1 point
            </p>
          </div>
          <div class="form__field-list">
            <div
              v-show="list.length >= 1"
              class="form__field-list-item"
              v-for="(item, index) in list"
              :key="index"
            >
              <p class="form__field-list-text">{{ item }}</p>
              <span
                @click="list.splice(index, 1)"
                class="form__field-list-close"
              ></span>
            </div>
          </div>
        </div>
        <div class="form__field">
          <p class="form__label">Description</p>
          <textarea
            v-model="description"
            placeholder="Description"
            class="form__textarea"
          ></textarea>
          <p id="description" class="form__field-error">
            This field must be filled in (minimum number of characters 3)
          </p>
          <div class="form__btn">
            <button
              @click="createNewItemList()"
              class="form__btn-item"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      item: "",
      description: "",
      list: [],
    };
  },
  methods: {
    ...mapActions(["ADD_ITEM_IN_LIST_ACTIONS"]),
    createListItem() {
      if (this.item.length >= 3) {
        this.list.push(this.item);
        this.item = "";
      }
    },
    createNewItemList() {
      const name = document.getElementById("name");
      const item = document.getElementById("item");
      const description = document.getElementById("description");

      if (this.name.length <= 3) {
        name.classList.add("active");
      } else {
        name.classList.remove("active");
      }

      if (this.list.length <= 0) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }

      if (this.description.length <= 3) {
        description.classList.add("active");
      } else {
        description.classList.remove("active");
      }

      if (
        this.name.length >= 3 &&
        this.list.length >= 1 &&
        this.description.length >= 3
      ) {
        const task = {
          id: Date.now(),
          name: this.name,
          affairs: this.list,
          description: this.description,
        };
        this.ADD_ITEM_IN_LIST_ACTIONS(task);
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.create {
  &__wrapper {
    padding: 60px 0px;
  }
  .form {
    &__field {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    &__field-list {
      display: flex;
      flex-wrap: wrap;
    }
    &__field-list-item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      background-color: #6fb6f7;
      border-radius: 10px;
      margin-right: 5px;
      position: relative;
    }
    &__field-list-text {
      color: #ffffff;
      font-size: 20px;
      line-height: 22px;
    }
    &__field-list-close {
      cursor: pointer;
      width: 15px;
      height: 15px;
      position: relative;
      margin-left: 8px;
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
    &__label {
      margin-bottom: 10px;
      font-size: 18px;
      line-height: 22px;
      color: #a6a4a4;
    }
    &__input,
    &__textarea {
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
    &__textarea {
      resize: none;
      height: 200px;
    }
    &__field-error {
      color: #ff2929;
      font-size: 14px;
      line-height: 16px;
      margin-top: 5px;
      display: none;
      &.active {
        display: block;
        animation: error 0.2s;
        @keyframes error {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
          75% {
            transform: translateX(-10px);
          }
          100% {
            transform: translateX(10px);
          }
        }
      }
    }
    &__btn {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      padding-top: 20px;
    }
    &__btn-item {
      padding: 8px 12px;
      border-radius: 6px;
      background-color: #6fb6f7;
      color: #ffffff;
      font-size: 20px;
      line-height: 22px;
    }
  }
}
</style>
