<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row v-for="r in recipes" :key="r.id">
      <RecipePreviewUser class="recipePreview" :title="title" :recipe="r" />
      <br />
    </b-row>
  </b-container>
</template>

<script>
import RecipePreviewUser from "./RecipePreviewUser.vue";
export default {
  name: "RecipePreviewListUser",
  components: {
    RecipePreviewUser,
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
