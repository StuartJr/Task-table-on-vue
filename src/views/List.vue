<template>
  <div class="list">
    <div class="list__wrapper">
      <h1 class="list__title">List</h1>
      <div class="list__list-wrapper">
        <div class="list__content">
          <div class="list__content-list list__content-list_title">
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">#</p>
            </div>
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">Name</p>
            </div>
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">Status</p>
            </div>
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">Affairs</p>
            </div>
            <div class="list__content-list-item description">
              <p class="list__content-list-item-text">Description</p>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <p class="list__content-list-item-text">Сomplete</p>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <p class="list__content-list-item-text">Change</p>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <p class="list__content-list-item-text">Delete</p>
            </div>
          </div>
          <div
            class="list__content-list"
            v-for="(item, index) in TASK_LIST"
            :key="index"
          >
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">{{ index + 1 }}</p>
            </div>
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">
                {{ item.name }}
              </p>
            </div>
            <div class="list__content-list-item">
              <p class="list__content-list-item-text">
                {{ item.status }}
              </p>
            </div>
            <div class="list__content-list-item">
              <ul class="list__content-list-affairs" v-if="item.affairs">
                <div
                  v-show="index <= 0"
                  class="list__content-list-affairs-item"
                  v-for="(item, index) in item.affairs"
                  :key="index"
                >
                  <p class="list__content-list-affairs-index">
                    {{ index + 1 }}.
                  </p>
                  <p class="list__content-list-affairs-text">{{ item }}</p>
                </div>
                <span v-show="+item.affairs.length >= 2"
                  >Остальные пункты в Change</span
                >
              </ul>
            </div>
            <div class="list__content-list-item description">
              <p class="list__content-list-item-text">
                {{ item.description }}
              </p>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <p
                class="list__content-list-item-btn list__content-list-item-btn_blue"
                :class="{ active: item.status == 'Complete' }"
                @click="comlpleteTask(item.id)"
              >
                Сomplete
              </p>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <router-link
                :to="'/task/' + item.id"
                class="list__content-list-item-btn list__content-list-item-btn_blue"
              >
                Change
              </router-link>
            </div>
            <div class="list__content-list-item list__content-list-item_btn">
              <p
                class="list__content-list-item-btn list__content-list-item-btn_red"
                @click="showPopup(index)"
              >
                Delete
              </p>
              <div v-if="isShowPopup" class="list__popup-bg"></div>
              <div class="list__popup">
                <div class="list__popup-wrapper">
                  <p class="list__popup-close" @click="closePopup()"></p>
                  <p class="list__popup-title">Are you sure?</p>
                  <div class="list__popup-choise">
                    <p
                      class="list__popup-btn list__popup-btn_yes"
                      @click="deleteTaskComplite(index)"
                    >
                      Yes
                    </p>
                    <p
                      class="list__popup-btn list__popup-btn_no"
                      @click="closePopup()"
                    >
                      No
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "List",
  data() {
    return {
      isShowPopup: false,
    };
  },
  computed: {
    ...mapGetters(["TASK_LIST"]),
  },
  methods: {
    ...mapActions([
      "DELETE_ITEM_IN_LIST_ACTIONS",
      "COMPLETE_ITEM_IN_LIST_ACTIONS",
    ]),
    closePopup() {
      const allPopups = document.querySelectorAll(".list__popup");
      for (let popup of allPopups) {
        popup.classList.remove("active");
        this.isShowPopup = false;
      }
    },
    showPopup(index) {
      const allPopups = document.querySelectorAll(".list__popup");
      allPopups[index].classList.add("active");
      this.isShowPopup = true;
    },
    deleteTaskComplite(index) {
      this.DELETE_ITEM_IN_LIST_ACTIONS(index);
      const allPopups = document.querySelectorAll(".list__popup");
      for (let popup of allPopups) {
        popup.classList.remove("active");
        this.isShowPopup = false;
      }
    },
    comlpleteTask(id) {
      this.COMPLETE_ITEM_IN_LIST_ACTIONS(id);
    },
  },
  mounted() {
    this.$nextTick(() => {
      const allItems = document.querySelectorAll(".description");
      for (let item of allItems) {
        if (item.offsetHeight >= 80) {
          item.classList.add("active");
        }
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.list {
  &__wrapper {
    padding: 60px 0px;
  }
  &__content-list {
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #a6a4a4;
    padding: 15px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    &_title {
      p {
        font-weight: 600;
      }
    }
  }
  &__content-list-item {
    width: 100%;
    margin-right: 10px;

    &:first-child {
      max-width: 30px;
    }
    &:nth-child(2) {
      max-width: 100px;
    }
    &:nth-child(3) {
      max-width: 100px;
    }
    &:nth-child(4) {
      max-width: 250px;
    }
    &:last-child {
      margin-right: 0;
    }
    &_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 100px;
    }
  }
  &__content-list-item-text {
    font-size: 18px;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 450px;
  }
  &__content-list-affairs {
    span {
      font-size: 16px;
      line-height: 18px;
      color: #a6a4a4;
    }
  }
  &__content-list-affairs-item {
    display: flex;
    font-size: 18px;
    line-height: 20px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__content-list-affairs-index {
    margin-right: 10px;
  }
  &__content-list-item-btn {
    padding: 10px;
    border-radius: 8px;
    color: #ffffff;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
    &.active {
      background-color: #a6a4a4;
      cursor: default;
    }
    &_red {
      background-color: #ff2929;
    }
    &_blue {
      background-color: #6fb6f7;
    }
  }

  &__popup {
    z-index: 3;
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    max-width: 400px;
    max-height: 200px;
    background-color: #ffffff;
    border: 1px solid #a6a4a4;
    border-radius: 8px;
    &.active {
      display: block;
    }
  }
  &__popup-wrapper {
    z-index: 3;
    height: 100%;
    position: relative;
    padding: 10px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__popup-title {
    font-size: 32px;
    line-height: 34px;
    padding-bottom: 50px;
  }
  &__popup-choise {
    width: 100%;
    max-width: 160px;
    display: flex;
    justify-content: space-between;
  }
  &__popup-btn {
    cursor: pointer;
    width: 60px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20px;
    line-height: 22px;
    &_yes {
      background-color: #ff2929;
    }
    &_no {
      background-color: #6fb6f7;
    }
  }
  &__popup-close {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
    &:before {
      content: "";
      position: absolute;
      top: 10px;
      right: 0;
      width: 20px;
      height: 2px;
      background-color: #a6a4a4;
      transform: rotate(45deg);
    }
    &:after {
      content: "";
      position: absolute;
      top: 10px;
      right: 0;
      width: 20px;
      height: 2px;
      background-color: #a6a4a4;
      transform: rotate(-45deg);
    }
  }
  &__popup-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
