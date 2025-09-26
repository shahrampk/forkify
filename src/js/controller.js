import * as model from './model.js';
import RecipeView from './views/recipe-view.js';
import searchView from './views/search-view.js';
import resultViews from './views/result-views.js';
import paginationView from './views/pagination-view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipe-view.js';
export async function controlRecipies() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Showing Loader...
    RecipeView.renderLoader();

    // Loading Recipies...
    await model.loadRecipies(id);

    // rendring recipes
    RecipeView.render(model.state.recipe);
  } catch (error) {
    // Catching the error comming from model.js...
    RecipeView.renderError();
  }
}

const controlSearchResult = async function () {
  try {
    // 1) Get Search Quey
    const query = searchView.getQuery();
    if (!query) return;
    // Showing Loader...
    resultViews.renderLoader();
    paginationView._clear();
    model.state.search.page = 1;
    // Loading Search Results...

    await model.loadSearchResult(query);
    // Rendering Recipies...
    resultViews.render(model.searchPerPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    resultViews.renderError();
  }
};
const controlPaginations = function (goToPage) {
  resultViews.render(model.searchPerPage(goToPage));
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.UpdateServing(newServings);
  recipeView.render(model.state.recipe);
};
const init = function () {
  RecipeView.addHandlerRender(controlRecipies);
  RecipeView.addHandlerUpdateServing(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerBtn(controlPaginations);
};
init();
