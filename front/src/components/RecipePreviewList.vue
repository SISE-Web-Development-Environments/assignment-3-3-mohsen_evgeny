<template>
  <b-container>
    <h3>
      {{ title }}
      <slot></slot>
    </h3>
    <span v-if="title == 'Personal Recipes'">
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" :title="title" />
        </b-col>
      </b-row>
    </span>
    <span v-else>
      <b-row v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" :title="title" />
        <br />
      </b-row>
    </span>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
