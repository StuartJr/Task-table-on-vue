<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/navbar";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
</style>
