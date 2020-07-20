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
        this.favoriteResponse = this.$root.store.favorite_recipes;
      } catch (err) {}
    },
  },
};
</script>
