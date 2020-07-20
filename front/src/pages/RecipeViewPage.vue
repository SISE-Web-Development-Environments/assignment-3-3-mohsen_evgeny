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
              <div>Servings: {{ recipe.servings }} servings</div>

              <button v-show="!isHidden" @click="addToFavorite">Save</button>
            </div>
            Ingredients:
            <ul v-if="this.$route.params.family || this.$route.params.personal">
              <li v-for="index in recipe.ingredients[0]" :key="index">
                {{ index }}
              </li>
            </ul>
            <ul v-else>
              <li v-for="index in recipe.ingredients" :key="index">
                {{ index }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol v-if="this.$route.params.family || this.$route.params.personal">
              <li v-for="s in recipe.instructions[0]" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
            <ol v-else>
              <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
      isHidden: true,
      favorites: [],
    };
  },
  async created() {
    try {
      let response;

      try {
        if (this.$route.params.family || this.$route.params.personal) {
          response = await this.axios.get(
            `http://localhost:3000/user/getPersonalRecipeInfo/${this.$route.params.recipeId}`
          );
        } else {
          response = await this.axios.get(
            `http://localhost:3000/recipes/show/${this.$route.params.recipeId}`
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

  methods: {
    async addToFavorite() {
      try {
        await this.axios.post(
          `http://localhost:3000/user/recipeInfo/add/${this.recipe.id}`,
          {
            isSaved: 1,
          }
        );
        this.isHidden = true;

        const favoriteResponse = await this.axios.get(
          "http://localhost:3000/user/favorites"
        );
        this.$root.store.favorite_recipes = favoriteResponse["data"];
      } catch (error) {
        console.log(error);
      }
    },
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
</style>
