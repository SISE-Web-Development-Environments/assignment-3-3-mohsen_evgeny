<template>
  <div class="container">
    <h1 class="title">Login</h1>
    <b-form @submit.prevent="onLogin">
      <b-form-group
        id="input-group-Username"
        label-cols-sm="3"
        label="Username:"
        label-for="Username"
      >
        <b-form-input
          id="Username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Username is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="Password"
      >
        <b-form-input
          id="Password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback>
          Password is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        style="width:100px;display:block;"
        class="mx-auto w-100"
        >Login</b-button
      >
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Login failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined,
      },
    };
  },
  validations: {
    form: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        const response = await this.axios.post("http://localhost:3000/Login", {
          username: this.form.username,
          password: this.form.password,
        });
        // console.log(response);
        // this.$root.loggedIn = true;
        console.log(this.$root.store.login);
        await this.getFavorites();
        await this.updateWatched();

        await this.getAllWatched();
        this.$root.store.login(this.form.username);
        console.log(this.$root.store);
        try {
          // this.$router.go("/#/"); //redirect to main page !!!!!
          this.$router.push("/").catch(() => {
            this.$forceUpdate();
          });
        } catch (err) {
          console.log(err.response);
        }
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    async onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      await this.Login();
    },

    async getFavorites() {
      const favorite = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        `http://localhost:3000/user/favorites`
      );

      // local
      // await this.$root.store.setFavorite(favorite["data"]);

      this.$root.store.favorite_recipes = favorite["data"];
    },

    async getAllWatched() {
      const watched = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        `http://localhost:3000/user/allWatched`
      );

      // local
      // await this.$root.store.setFavorite(favorite["data"]);

      this.$root.store.all_watched = watched["data"];
    },
    async updateWatched() {
      const watchedResponse = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        "http://localhost:3000/user/watched"
      );
      // const watchedRecipes = watchedResponse.data; // change to data
      // this.watchedRecipes = [];
      this.$root.store.watched_user = watchedResponse["data"];
      // console.log(this.watchedRecipes);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}

.btn-primary {
  color: #fff;
  background-color: black;
  border-color: black;
}
</style>
