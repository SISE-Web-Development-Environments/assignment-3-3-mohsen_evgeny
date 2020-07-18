<template>
  <div class="recipe-preview-user">
    <router-link
      :to="{
        name: 'recipe',
        params: { recipeId: recipe.RecipeId, family: true },
      }"
    >
      <div class="recipe-body">
        <!-- <img v-if="image_load" :src="recipe.image" class="recipe-image" /> -->
        <img :src="recipe.ImageUrl" class="recipe-image" />
      </div>
    </router-link>
    <div class="recipe-footer">
      <div :title="recipe.RecipeName" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
        <li>👨‍🍳{{ recipe.Origin }}</li>
        <li>⏰{{ recipe.Reason }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipe-preview-user {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  /* margin: 20px 20px; */
  border-style: solid;
}
.recipe-previews > .recipe-body {
  width: 100%;
  /* height: 200px; */
  position: relative;
}

img.recipe-image {
  height: 300px;
}
.recipe-preview-user .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 100%;
  /* height: 40%; */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview-user .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview-user .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  height: 20%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  font-weight: bold;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview-user .recipe-footer ul.recipe-overview {
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

.recipe-preview-user .recipe-footer ul.recipe-overview li {
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
