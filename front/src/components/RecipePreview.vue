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
      <div v-if="title == 'Favorite Recipes'">
        <router-link
          :to="{
            name: 'recipe',
            params: { recipeId: recipe.id, favorite: true },
          }"
        >
          <div class="recipe-body">
            <img :src="recipe.image" class="recipe-image" />
          </div>
        </router-link>
      </div>
      <div v-else>
        <router-link
          :to="{ name: 'recipe', params: { recipeId: recipe.id } }"
          class="recipe-preview"
          @click.native="addToWatch"
        >
          <div class="recipe-body">
            <img :src="recipe.image" class="recipe-image" />
          </div>
        </router-link>
      </div>

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

  created() {
    this.favorites = this.$root.store.favorite_recipes;
    this.allWatched = this.$root.store.all_watched;
  },

  data() {
    return {
      favorite: null,
      watched: "❌",
      isHidden: false,
      favorites: [],
      allWatched: [],
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
      try {
        Array.prototype.forEach.call(this.favorites, (recipe) => {
          if (recipe.id == this.recipe.id && recipe.isSaved) {
            this.favorite = "❤️";
            this.isHidden = true;
            return;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async getIsWatched() {
      if (this.title == "Last Viewed Recipes") {
        this.watched = "✔️";
        return;
      }
      try {
        Array.prototype.forEach.call(this.allWatched, (recipe) => {
          if (recipe.id == this.recipe.id) {
            this.watched = "✔️";
            return;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addToWatch() {
      //add to watch list
      if (
        this.$root.store.username &&
        !this.$route.params.family &&
        !this.$route.params.personal &&
        !this.$route.params.favorite
      ) {
        isHidden: false;
        this.watched = "✔️";
        try {
          await this.axios.post(
            `http://localhost:3000/user/recipeInfo/add/${this.recipe.id}`,
            {
              isSaved: 0,
            }
          );

          let watchedResponse = await this.axios.get(
            "http://localhost:3000/user/allWatched"
          );

          this.$root.store.all_watched = watchedResponse["data"];
          this.allWatched = this.$root.store.all_watched;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async addToFavorite() {
      try {
        if (
          this.allWatched.some((elem) => {
            return JSON.stringify(this.recipe.id) === JSON.stringify(elem.id);
          })
        ) {
          await this.axios.put(
            `http://localhost:3000/user/recipeInfo/update/${this.recipe.id}`,
            {
              isSaved: 1,
            }
          );
        } else {
          await this.axios.post(
            `http://localhost:3000/user/recipeInfo/add/${this.recipe.id}`,
            {
              isSaved: 1,
            }
          );
        }
        this.watched = "✔️";
        this.favorite = "❤️";
        this.isHidden = true;

        let favoriteResponse = await this.axios.get(
          "http://localhost:3000/user/favorites"
        );
        this.$root.store.favorite_recipes = favoriteResponse["data"];
        this.favorites = this.$root.store.favorite_recipes;

        let watchedResponse = await this.axios.get(
          "http://localhost:3000/user//allWatched"
        );

        this.$root.store.all_watched = watchedResponse["data"];
        this.allWatched = this.$root.store.all_watched;
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
  max-width: 800px;
  min-width: 250px;

  position: relative;
  border-style: solid;
}
.recipe-preview > .recipe-body {
  width: 100%;
  position: relative;
}

div.col {
  min-width: 300px;
}

img.recipe-image {
  height: 300px;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
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
