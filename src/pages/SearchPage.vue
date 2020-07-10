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
          <b-form-select
            id="amount"
            v-model="amount"
            :options="amountsList"
          />
        </b-input-group>

        <b-input-group prepend="Cuisine">
          <b-form-select
            id="cuisine"
            v-model="cuisine"
            :options="cuisinesList"
          />
        </b-input-group>

        <b-input-group prepend="Diet">
          <b-form-select
            id="diet"
            v-model="diet"
            :options="dietsList"
          />
        </b-input-group>

        <b-input-group prepend="Intolerance">
          <b-form-select
            id="intolerance"
            v-model="intolerance"
            :options="intolerancesList"
          />
        </b-input-group>

        <b-input-group prepend="Sort">
          <b-form-select
            id="sort"
            @change="useSort"
            v-model="sort"
            :options="sortsList"
          />
        </b-input-group>

      </b-form>
    </b-form>

    <br />
    <RecipePreviewList title="Results"
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
    data(){
      return{
        recipes: [],
        userQuery: "",
        amount: 5,
        cuisinesList: cuisinesList,
        dietsList: dietsList,
        intolerancesList: intolerancesList,
        cuisine: null,
        diet: null,
        intolerance: null,
        amountsList: [5, 10, 15],
        sort: null,
        sortsList: [
          //{value: null, text: "Unsorted", disabled: true},
          {value: "readyinminutes", text: "Ready in minutes"},
          {value: "likes", text: "Likes"},
        ]
      }
    },
    mounted() {
      if(!Object.keys(this.cuisinesList).includes(null)){
        this.cuisinesList.push({ value: null, text: 'All'})
      }
      if(!Object.keys(this.dietsList).includes(null)){
        this.dietsList.push({value: null, text: 'All'})
      }
      if(!Object.keys(this.intolerancesList).includes(null)){
        this.intolerancesList.push({ value: null, text: 'All'})
      }
    },
    methods:{
      getQuery(query){
        this.userQuery = query;
      },

      async search(){
        try {
          console.log(this.userQuery)
          console.log(this.amount)
          console.log(this.cuisine)
          console.log(this.diet)
          console.log(this.intolerance)
          const response = await this.axios.get(
            `http://localhost:3000/recipes/search/query/${this.userQuery}/amount/${this.amount}`,
            {
              params: {
                cuisine: this.cuisine,
                diet: this.diet,
                intolerance: this.intolerance
              }
            }
          );

          let recipesData = response.data;

          if(recipesData.length === 0){
            alert("No search results");
            return;
          }

          this.sort = null;
          this.recipes = recipesData;
        }
        catch(error){
          console.log(error);
        }
      },

      readyInMinutesCompare(a, b){
        if (a.readyInMinutes < b.readyInMinutes)
          return -1;
        if (a.readyInMinutes > b.readyInMinutes)
          return 1;
        return 0;
      },

      likesCompare(a, b){
        if (a.aggregateLikes < b.aggregateLikes)
          return -1;
        if (a.aggregateLikes > b.aggregateLikes)
          return 1;
        return 0;
      },

      readyInMinutesSort(){
        this.recipes = this.recipes.sort(this.readyInMinutesCompare);
      },

      likesSort(){
        this.recipes = this.recipes.sort(this.likesCompare);
      },

      useSort(){
        if(this.sort === "readyinminutes"){
          this.readyInMinutesSort();
        }
        else if(this.sort === "likes"){
          this.likesSort();
        }
      }
    }
  }
</script>