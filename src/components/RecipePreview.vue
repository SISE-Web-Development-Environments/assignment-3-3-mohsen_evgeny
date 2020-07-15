<template>
  <div>
    <div v-if="title == 'Personal Recipes'">
      <router-link
        :to="{
          name: 'recipe',
          params: { recipeId: recipe.id, personal: true },
        }"
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
          <li>{{ recipe.readyInMinutes }} minutessadasdsa</li>
          <li>{{ recipe.aggregateLikes }} likes</li>
        </ul>
        <ul class="recipe-overview">
          <li>
            vegetarian <span v-if="recipe.vegetarian">✔️</span>
            <span v-else>❌</span>
          </li>

          <li>
            vegan <span v-if="recipe.vegan">✔️</span> <span v-else>❌</span>
          </li>
          <li>
            glutenFree <span v-if="recipe.glutenFree">✔️</span>
            <span v-else>❌</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
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
            vegetarian <span v-if="recipe.vegetarian">✔️</span>
            <span v-else>❌</span>
          </li>

          <li>
            vegan <span v-if="recipe.vegan">✔️</span> <span v-else>❌</span>
          </li>
          <li>
            glutenFree <span v-if="recipe.glutenFree">✔️</span>
            <span v-else>❌</span>
          </li>
          <li>Watched {{ this.watched }}</li>
          <li>
            Favorite {{ this.favorite }}
            <button v-show="!isHidden" @click="addToFavorite">Save</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
     this.getIsFavorite();
     this.getIsWatched();
  },

  data() {
    return {
      favorite: null,
      watched: null,
      isHidden: true,
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
      const favorite = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        `http://localhost:3000/user/favorites/${this.recipe.id}`
      );

      if (favorite["data"].length > 0 && favorite["data"][0].isSaved) {
        this.favorite = "✔️";
        return;
      }
      this.isHidden = false;
      this.favorite = "❌";
    },

    async getIsWatched() {
      const favorite = await this.axios.get(
        // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
        `http://localhost:3000/user/favorites/${this.recipe.id}`
      );

      if (favorite["data"].length > 0 && favorite["data"][0].isWatched) {
        this.watched = "✔️";
        return;
      }
      this.watched = "❌";
    },

    async addToFavorite() {
      try {
        await this.axios.post(
          // "https://ass-3-2-mohsen-evgeny.herokuapp.com/recipes/random"
          `http://localhost:3000/user/recipeInfo/add/${this.recipe.id}`,
          {
            isSaved: 1,
          }
        );
        this.favorite = "✔️";
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
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 100%;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  height: 80%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  /* height: 50%; */
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
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
</style>
