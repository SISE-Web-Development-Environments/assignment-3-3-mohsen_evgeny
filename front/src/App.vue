<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/NavBar";
export default {
  components: {
    Navbar,
  },
  name: "App",
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  color: #2c3e50;
  min-height: 100vh;
}
</style>
