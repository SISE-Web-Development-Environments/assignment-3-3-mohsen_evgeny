<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    
    <br />
    <b>What to find?</b>
    
    <b-form-input
      id="userQuery"
      placeholder="Search the recipes"
      @model="userQuery"
    />

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
        amountsList: [ 
          { value: 5, text: '5' },
          { value: 10, text: '10' },
          { value: 15, text: '15' },
        ],
      }
    },
    mounted() {
      this.cuisinesList.push({ value: null, text: 'Select cuisine', disabled: true})
      this.dietsList.push({value: null, text: 'Select diet', disabled: true})
      this.intolerancesList.push({ value: null, text: 'Select intolerance', disabled: true})
    },
  }
</script>