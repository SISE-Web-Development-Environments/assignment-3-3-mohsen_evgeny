<template>
  <div class="container">
    <h1 class="title">Personal Page</h1>
    <RecipePreviewList
      title="Personal Recipes"
      class="PersonalRecipes center"
      :recipes="personalResponse"
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
      personalResponse: [],
    };
  },

  created() {
    this.getPersonalRecipes();
  },
  methods: {
    async getPersonalRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/myrecipes"
        );
        console.log("test1");
        console.log(response);
        console.log("test");
        const recipes = response.data; // change to data
        this.personalResponse = recipes;
        this.$store.personalResponse = recipes;
      } catch (err) {}
    },
  },
};
</script>
