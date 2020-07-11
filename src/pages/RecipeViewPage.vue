<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <div>Likes: {{ recipe.aggregateLikes }} likes</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="index in recipe.ingredients" :key="index">
                {{ index }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;

      try {
        if (this.$route.params.family || this.$route.params.personal) {
          response = await this.axios.get(
            // `https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/show/${this.$route.params.recipeId}`
            // `http://localhost:3000/recipes/show/${this.$route.params.recipeId}`
            `http://localhost:3000/user/getPersonalRecipeInfo/${this.$route.params.recipeId}`
          );
        } else {
          response = await this.axios.get(
            // `https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/show/${this.$route.params.recipeId}`
            `http://localhost:3000/recipes/show/${this.$route.params.recipeId}`
            // `http://localhost:3000/user/getPersonalRecipeInfo/${this.$route.params.recipeId}`
          );
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      console.log(response);

      if (this.$route.params.family || this.$route.params.personal) {
        this.recipe = response.data[0];
      } else {
        this.recipe = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
/* .recipe-header{

} */
</style>
