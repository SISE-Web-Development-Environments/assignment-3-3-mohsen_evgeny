<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title text-center">Main Page</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RecipePreviewList
          title="Random Recipes"
          class="RandomRecipes center"
          :recipes="randomRecipes"
        >
          <button @click="updateRecipes">🔄</button>
        </RecipePreviewList>
      </b-col>
      <!-- show for un loggedin users -->
      <b-col v-if="!$root.store.username">
        <LoginPage />
      </b-col>
      <b-col v-else v-bind:class="updateWatched()">
        <!-- TODO Change to RecipePreviewListUser -->
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          :recipes="watchedRecipes"
          disabled
        ></RecipePreviewList>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
// import RecipePreviewListUser from "../components/RecipePreviewListUser";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    // RecipePreviewListUser,
    LoginPage,
  },
  data() {
    return {
      randomRecipes: [],
      watchedRecipes: [],
      bool: false,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateWatched() {
      if (!this.bool) {
        const watchedResponse = await this.axios.get(
          // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
          "http://localhost:3000/user/watched"
        );
        const watchedRecipes = watchedResponse.data; // change to data
        this.watchedRecipes = [];
        this.watchedRecipes.push(...watchedRecipes);
        this.bool = true;
      }
    },
    async updateRecipes() {
      try {
        const randomResponse = await this.axios.get(
          // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
          "http://localhost:3000/recipes/random"
        );

        const randomRecipes = randomResponse.data; // change to data
        this.randomRecipes = [];
        this.randomRecipes.push(...randomRecipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
button {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
</style>
