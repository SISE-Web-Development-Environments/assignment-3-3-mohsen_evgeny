<template>
  <div class="container">
    <h1 class="title">Personal Page</h1>
    <RecipePreviewListUser
      title="Personal Recipes"
      class="PersonalRecipes center"
      :recipes="personalResponse"
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
          // "https://ass-3-2-mohsen-evgeny.herokuapp.com/user/myrecipes"
        );
        console.log("test1");
        console.log(response);
        console.log("test");
        const recipes = response.data; // change to data
        // this.personalResponse = [];
        this.personalResponse = recipes;
      } catch (err) {}
    },
  },
};
</script>
