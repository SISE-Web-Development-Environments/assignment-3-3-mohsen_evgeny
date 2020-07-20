<template>
  <div class="container">
    <h1 class="title">Family Page</h1>
    <RecipePreviewListUser
      title="Family Recipes"
      class="FamilyRecipes center"
      :recipes="familyResponse"
    />
  </div>
</template>

<script>
import RecipePreviewListUser from "../components/RecipePreviewListUser";

export default {
  components: {
    RecipePreviewListUser,
  },

  data: function() {
    return {
      familyResponse: [],
    };
  },

  created() {
    this.getFamilyRecipes();
  },
  methods: {
    async getFamilyRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/family"
        );
        console.log(response);
        const recipes = response.data; // change to data
        this.familyResponse = recipes;
      } catch (err) {}
    },
  },
};
</script>
