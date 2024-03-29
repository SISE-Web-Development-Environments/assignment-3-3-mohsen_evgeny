<template>
  <div class="container">
    <h1 class="title">Search Page</h1>

    <b-form @submit.prevent="search">
      <b-input-group>
        <b-form-input
          id="userQuery"
          placeholder="Search recipes"
          v-model="userQuery"
          @change="getQuery"
        />
        <b-input-group-append>
          <b-button variant="info" @click="search">Search</b-button>
        </b-input-group-append>
      </b-input-group>

      <b-form inline>
        <b-input-group prepend="Amount">
          <b-form-select id="amount" v-model="amount" :options="amountsList" />
        </b-input-group>

        <b-input-group prepend="Cuisine">
          <b-form-select
            id="cuisine"
            v-model="cuisine"
            :options="cuisinesList"
          />
        </b-input-group>

        <b-input-group prepend="Diet">
          <b-form-select id="diet" v-model="diet" :options="dietsList" />
        </b-input-group>

        <b-input-group prepend="Intolerance">
          <b-form-select
            id="intolerance"
            v-model="intolerances"
            :options="intolerancesList"
          />
        </b-input-group>

        <b-input-group prepend="Sort">
          <b-form-select
            id="sort"
            @change="sort"
            v-model="userSort"
            :options="sortsList"
          />
        </b-input-group>
      </b-form>
    </b-form>

    <br />
    <RecipePreviewList
      title="Results"
      class="RandomRecipes center"
      :recipes="recipes"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import cuisinesList from "../assets/cuisines.js";
import dietsList from "../assets/diets.js";
import intolerancesList from "../assets/intolerances.js";

export default {
  name: "SearchPage",
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      recipes: [],
      userQuery: "",
      amount: 5,
      cuisinesList: cuisinesList,
      dietsList: dietsList,
      intolerancesList: intolerancesList,
      cuisine: null,
      diet: null,
      intolerances: null,
      amountsList: [5, 10, 15],
      userSort: null,
      sortsList: [
        { value: "readyinminutes", text: "Ready in minutes" },
        { value: "likes", text: "Likes" },
      ],
    };
  },
  mounted() {
    if (
      typeof this.cuisinesList[this.cuisinesList.length - 1].value ==
      "undefined"
    ) {
      this.cuisinesList.push({ value: null, text: "All" });
    }
    if (typeof this.dietsList[this.dietsList.length - 1].value == "undefined") {
      this.dietsList.push({ value: null, text: "All" });
    }
    if (
      typeof this.intolerancesList[this.intolerancesList.length - 1].value ==
      "undefined"
    ) {
      this.intolerancesList.push({ value: null, text: "All" });
    }

    let searchedRecipes = this.$root.store.searched_recipes;
    let watched = this.$root.store.all_watched;

    Array.prototype.forEach.call(searchedRecipes, (sRecipe) => {
      Array.prototype.forEach.call(watched, (wRecipe) => {
        if (
          this.recipes.some((elem) => {
            return JSON.stringify(wRecipe.id) === JSON.stringify(elem.id);
          }) &&
          sRecipe.id == wRecipe.id
        ) {
          this.recipes.pop(sRecipe);
          this.recipes.push(wRecipe);
        } else if (sRecipe.id == wRecipe.id) {
          this.recipes.push(wRecipe);
        }
      });
    });

    Array.prototype.forEach.call(searchedRecipes, (sRecipe) => {
      if (
        !this.recipes.some((elem) => {
          return JSON.stringify(sRecipe.id) === JSON.stringify(elem.id);
        })
      ) {
        this.recipes.push(sRecipe);
      }
    });
  },
  methods: {
    getQuery(query) {
      this.userQuery = query;
    },

    async search() {
      try {
        if (this.userQuery === "") {
          this.$root.toast("Empty query", "Please, give a proper query");
          return;
        }

        const response = await this.axios.get(
          `http://localhost:3000/recipes/search/query/${this.userQuery}/amount/${this.amount}`,
          {
            params: {
              cuisine: this.cuisine,
              diet: this.diet,
              intolerances: this.intolerances,
            },
          }
        );

        let recipesData = response.data;

        if (recipesData.length === 0) {
          this.$root.toast("0 results", "No recipe found");
          this.recipes = [];
          return;
        }

        this.userSort = null;
        this.recipes = recipesData;
        this.$root.store.searched_recipes = recipesData;
      } catch (error) {
        console.log(error);
      }
    },

    readyInMinutesCompare(a, b) {
      if (a.readyInMinutes < b.readyInMinutes) return -1;
      if (a.readyInMinutes > b.readyInMinutes) return 1;
      return 0;
    },

    likesCompare(a, b) {
      if (a.aggregateLikes < b.aggregateLikes) return -1;
      if (a.aggregateLikes > b.aggregateLikes) return 1;
      return 0;
    },

    readyInMinutesSort() {
      this.recipes = this.recipes.sort(this.readyInMinutesCompare);
    },

    likesSort() {
      this.recipes = this.recipes.sort(this.likesCompare);
    },

    sort() {
      if (this.userSort === "readyinminutes") {
        this.readyInMinutesSort();
      } else if (this.userSort === "likes") {
        this.likesSort();
      }
    },
  },
};
</script>
