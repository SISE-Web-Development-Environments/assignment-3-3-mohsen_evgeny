<template>
  <div class="container">
    <b-row>
      <b-col>
        <h1 class="title text-center">Main Page</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <RecipePreviewList
          title="Randome Recipes"
          class="RandomRecipes center"
        />
      </b-col>
      <!-- show for un loggedin users -->
      <b-col v-if="!$root.store.username">
        <LoginPage />
      </b-col>
      <b-col v-else>
        <RecipePreviewList
          title="Last Viewed Recipes"
          :class="{
            RandomRecipes: true,
            blur: !$root.store.username,
            center: true,
          }"
          disabled
        ></RecipePreviewList>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginPage from "../pages/LoginPage";
export default {
  components: {
    RecipePreviewList,
    LoginPage,
  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>
