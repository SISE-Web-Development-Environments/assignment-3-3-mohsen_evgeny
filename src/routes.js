import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/personal",
    name: "personal",
    component: () => import("./pages/PersonalPage"),
    meta: { requiresAuth: true },
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
    meta: { requiresAuth: true },
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
    meta: { requiresAuth: true },
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
