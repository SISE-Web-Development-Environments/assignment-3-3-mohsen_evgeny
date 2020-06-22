<template>
  <b-navbar type="dark" variant="info">
    <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
    <b-navbar-brand>Vue Recipes </b-navbar-brand>
    <!-- left components in nav bar -->
    <b-navbar-nav>
      <router-link tag="b-nav-item" :to="{ name: 'main' }"
        >Main-Page</router-link
      >
      <router-link tag="b-nav-item" :to="{ name: 'search' }"
        >Search</router-link
      >
    </b-navbar-nav>

    <!-- right components in nav bar -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <template v-slot:button-content>
          <em v-if="!$root.store.username">Guest</em>
          <em v-else>{{ $root.store.username }}</em>
        </template>
        <span v-if="!$root.store.username">
          <router-link tag="b-dropdown-item" :to="{ name: 'register' }"
            >Register</router-link
          >
          <router-link tag="b-dropdown-item" :to="{ name: 'login' }"
            >Login</router-link
          >
        </span>
        <span v-else>
          <!-- {{ $root.store.username }}: -->
          <router-link tag="b-dropdown-item" :to="{ name: 'personal' }"
            >personal</router-link
          >
          <router-link tag="b-dropdown-item" :to="{ name: 'family' }"
            >family</router-link
          >
          <router-link tag="b-dropdown-item" :to="{ name: 'favorite' }"
            >favorites</router-link
          >
          <b-dropdown-item @click="Logout">Logout</b-dropdown-item>
          <!-- <button tag="b-dropdown-item" @click="Logout">Logout</button> -->
        </span>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    // method code taken from app.vue
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");

      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style></style>
