<template>
  <div class="navbar">
    <div class="navbar__wrapper">
      <router-link to="/" class="navbar__logo">List</router-link>
      <ul class="navbar__list">
        <router-link tag="li" to="/create" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "navbar",
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  &__wrapper {
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #6fb6f7;
  }
  &__logo {
    padding-left: 20px;
    display: flex;
    align-items: center;
    font-size: 34px;
    line-height: 36px;
    color: #ffffff;
    font-weight: 700;
  }
  &__list {
    display: flex;
    align-items: center;
    padding-right: 20px;
    list-style-type: none;

    li {
      margin-right: 40px;
      a {
        color: #ffffff;
        font-size: 20px;
        line-height: 24px;
      }
      &.active {
        a {
          color: #36342c;
        }
      }
    }
  }
}
</style>
