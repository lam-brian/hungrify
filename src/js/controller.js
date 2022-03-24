import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import homeView from "./views/homeView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime/runtime";

const controlHomePage = () => {
  homeView.renderHomePage();
};

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) throw new Error("Please enter a recipe");

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) render results

    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    resultsView.renderError(err);
  }
};

const controlPagination = (goToPage) => {
  resultsView.render(model.getSearchResultsPage(goToPage));
};

const controlServings = (newServings) => {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 2) Update recipe view
  recipeView.update(model.state.recipe);
  // 3) Render bookmarks
  bookmarksView.renderBookmarks(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.renderBookmarks(model.state.bookmarks);
};

const init = () => {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  homeView.addHandlerRender(controlHomePage);
  resultsView.addHandlerClick(controlPagination);
};

init();
