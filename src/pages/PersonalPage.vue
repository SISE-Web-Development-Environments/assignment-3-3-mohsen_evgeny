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
  // data() {
  //   personalResponse: undefined,
  // },

  created() {
    this.getPersonalRecipes();
  },
  methods: {
    async getPersonalRecipes() {
      try {
        const response = await this.axios.get(
          "http://localhost:3000/user/myrecipes",
          { withCredentials: true }
        );
        console.log("test1");
        console.log(response);
        console.log("test");
        const recipes = response.data; // change to data
        this.personalResponse = [];
        this.personalResponse.push(...recipes);

        try {
          this.$router.go("/"); //redirect to main page !!!!!
        } catch (err) {}
      } catch (err) {}
    },
  },
};
</script>
