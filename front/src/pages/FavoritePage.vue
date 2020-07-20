<template>
  <div class="container">
    <h1 class="title">Favorite Page</h1>
    <RecipePreviewList
      title="Favorite Recipes"
      class="FavoriteRecipes center"
      :recipes="favoriteResponse"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },

  data: function() {
    return {
      favoriteResponse: [],
    };
  },

  created() {
    this.getFavoriteRecipes();
  },
  methods: {
    async getFavoriteRecipes() {
      try {
        // const response = await this.axios.get(
        //   "http://localhost:3000/user/favorites"
        //   // "https://ass-3-2-mohsen-evgeny.herokuapp.com/user/myrecipes"
        // );
        // console.log("test1");
        // console.log(response);
        // console.log("test");
        // const recipes = response.data; // change to data
        // // this.personalResponse = [];
        // this.favoriteResponse = recipes;

        this.favoriteResponse = this.$root.store.favorite_recipes;
      } catch (err) {}
    },
  },
};
</script>
