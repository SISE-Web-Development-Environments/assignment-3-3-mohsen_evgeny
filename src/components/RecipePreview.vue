<template>
  <div class="recipe-preview">
    <div v-if="title == 'Personal Recipes'">
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: recipe.id, personal: true },
        }"
      >
        <div class="recipe-body">
          <img :src="recipe.image" class="recipe-image" />
        </div>
      </router-link>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutessadasdsa</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
        <ul class="recipe-overview">
          <li>
            vegetarian<br />
            <span v-if="recipe.vegetarian">✔️</span>
            <span v-else>❌</span>
          </li>

          <li>
            vegan <br /><span v-if="recipe.vegan">✔️</span>
            <span v-else>❌</span>
          </li>
          <li>
            glutenFree<br />
            <span v-if="recipe.glutenFree">✔️</span>
            <span v-else>❌</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="recipe-preview">
      <router-link
        :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
        class="recipe-preview"
      >
        <div class="recipe-body">
          <img :src="recipe.image" class="recipe-image" />
        </div>
      </router-link>
      <div class="recipe-footer">
        <div :title="recipe.title" class="recipe-title">
          {{ recipe.title }}
        </div>
        <ul class="recipe-overview">
          <li>{{ recipe.readyInMinutes }} minutes</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
        <ul class="recipe-overview">
          <li>
            vegetarian<br />
            <span v-if="recipe.vegetarian">✔️</span>
            <span v-else>❌</span>
          </li>

          <li>
            vegan<br />
            <span v-if="recipe.vegan"> ✔️</span>
            <span v-else>❌</span>
          </li>
          <li>
            glutenFree <br /><span v-if="recipe.glutenFree">✔️</span>
            <span v-else>❌</span>
          </li>
          <span v-if="this.$root.store.username">
            <li>Watched <br />{{ this.watched }}</li>
            <li>
              Favorite <br />{{ this.favorite }}
              <button v-show="!isHidden" @click="addToFavorite">🤍</button>
            </li>
          </span>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.title);
    // this.title !== "Favorite Recipes"
    if (this.$root.store.username && this.title !== "Personal Recipes") {
      this.getIsFavorite();
      this.getIsWatched();
    }
    if (this.title == "Favorite Recipes") {
      this.favorite = "❤️";
    }
  },

  data() {
    return {
      favorite: null,
      watched: "❌",
      isHidden: false,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  methods: {
    async getIsFavorite() {
      // const favorite = await this.axios.get(
      //   // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
      //   `http://localhost:3000/user/favorites/${this.recipe.id}`
      // );

      let favorite = this.$root.store.getFavorite("favorite_recipes");

      if (favorite == null) {
        favorite = await this.axios.get(
          // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
          `http://localhost:3000/user/favorites/`
        );
        this.$root.store.setFavorite(favorite["data"]);
      }
      favorite.forEach((recipe) => {
        if (recipe.id == this.recipe.id && recipe.isSaved) {
          this.recipe = "❤️";
          this.isHidden = true;
          return;
        }
        this.isHidden = false;
      });

      // this.favorite = "🤍";
    },

    async getIsWatched() {
      const favorite = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        `http://localhost:3000/user/favorites/${this.recipe.id}`
      );
      // const favorite = this.$root.store.favorite_recipes;

      if (favorite["data"].length > 0 && favorite["data"][0].isWatched) {
        this.watched = "✔️";
        return;
      }
      this.watched = "❌";
    },

    async addToFavorite() {
      try {
        if (this.watched) {
          await this.axios.put(
            // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
            `http://localhost:3000/user/recipeInfo/update/${this.recipe.id}`,
            {
              isSaved: 1,
            }
          );
        } else {
          await this.axios.post(
            // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
            `http://localhost:3000/user/recipeInfo/add/${this.recipe.id}`,
            {
              isSaved: 1,
            }
          );
        }
        this.favorite = "❤️";
        this.isHidden = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  /* margin-top: 10px; */
  border-style: solid;
}
.recipe-preview > .recipe-body {
  width: 100%;
  /* height: 100%; */
  position: relative;
  /* margin-top: 10px; */
}

img.recipe-image {
  height: 300px;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  /* margin-top: auto; */
  margin-bottom: auto;
  display: block;
  width: 100%;
  /* height: 80%; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
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
